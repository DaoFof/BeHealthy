require('./config/config');

const _ = require('lodash');
const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
let io = socketIO(server);
var multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
app.use(cors(corsOptions));

*/
//multer storage setup
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    console.log(req.user._id);
    
    cb(null, req.user._id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Diagnose} = require('./models/diagnose');
var {Disease} = require('./models/disease');
var {Doctor} = require('./models/doctor');
var {Drug} = require('./models/drug');
var {Appointement} = require('./models/happointement');
var {Departement} = require('./models/hdepartement');
var {Hospital} = require('./models/hospital');
var {Patient} = require('./models/patient');
var {Prescription} = require('./models/prescription');
var {Symptom} =  require('./models/symptom');
var {User} = require('./models/user');

const port = process.env.PORT;
//ENABLE CORS
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH");
  res.header("Access-Control-Expose-Headers", "x-auth");
  next();
});*/


// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

var hospitalRoutes =  require('./routes/hospitalroutes');
hospitalRoutes(app);

const doctorRoutes =  require('./routes/doctorroutes'), 
    departementRoutes =  require('./routes/hdepartementroutes');
    patientRoutes =  require('./routes/patientroutes'),
    diagnoseRoutes =  require('./routes/diagnoseroutes'),
    prescriptionRoutes =  require('./routes/prescriptionroutes'),
    userRoute =  require('./routes/userroute');

  userRoute(app, upload);
  departementRoutes(app);
  /*doctorRoutes(app);
  patientRoutes(app);
  diagnoseRoutes(app);
  prescriptionRoutes(app);*/


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', message);
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
  
module.exports = {app};