var {Hospital} = require('../models/hospital');
var { User } = require('../models/user');
const {ObjectID} = require ('mongodb');
const _ = require('lodash');

var {authenticate} = require('../middleware/authenticate');

module.exports = function(app) {

    app.post('/hospital',authenticate, async (req, res) => {
      try{
        var hospital = new Hospital({
          name: req.body.name,
          city: req.body.city,
          country: req.body.country,
          lat: req.body.lat,
          lng: req.body.lng,
          contact: req.body.contact,
          email: req.body.email,
          departments: req.body.departmentControl,
          managerId: req.user._id
        });
        const doc = await hospital.save();
        res.send(doc);
      }catch(e){
        res.status(400).send(e);
      }
    });
    
      app.get('/hospital', /*authenticate,*/ async (req, res) => {
        try {
          var header = req.header('x-auth');
          console.log({header});
          const hospitals = await Hospital.find({});
          res.send({hospitals});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/hospital/:id', /*authenticate, */ async (req, res) => {
        try {
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          const hospital = await Hospital.findOne({
            _id : id 
          });
          if(!hospital){
            return res.status(404).send({hospital: 'Nothing found'});
          }
          res.send({hospital});
        } catch (e) {
          res.status(400).send(e);
        }
      });

      app.get('/managerHospital', authenticate, async(req, res)=>{
        try{
          var id = req.user._id;
          const hospital = await Hospital.find({
            managerId: id
          });
          if (!hospital) {
            return res.status(404).send({ hospital: 'Nothing found' });
          }
          res.send({ hospital });
        }catch(e){
          res.status(400).send(e);
        }
      });

      app.delete('/hospital/:id',authenticate, async (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send({url: id + '/Not found'});
          }
          const hospital = await Hospital.findOneAndRemove({
            _id:id,
            managerId: req.user._id
          });
          if(!hospital){
            return res.status(404).send();
          }
          res.status(200).send({hospital});
        }catch(e){
          console.log(e);
          
          res.status(400).send(e);
        }
      });
      
      app.patch('/hospital/:id',authenticate, async  (req, res)=>{
        try{
          var id = req.params.id;
          if(!ObjectID.isValid(id)){
            return res.status(404).send();
          }
          var body = req.body;
          if(req.body.departmentControl){
            body.departments = req.body.departmentControl;
          }
        const hospital = await Hospital.findOneAndUpdate({_id : id, managerId: req.user._id},{$set : body}, {new : true});
          if(!hospital){
            return res.status(404).send();
          }
          res.send({hospital});
        }catch(e){
          res.status(400).send(e);
        }      
      });
      // Appointment routes
      app.post('/appointmentRequest', authenticate, async (req, res) => {
        try {
          const ids = [req.body.hospitalId, req.body.doctor]
          for (const id of ids) {
            if (!ObjectID.isValid(id)) {
              return res.status(404).send();
            }
          }
          //console.log(req.body);
          const hospital = await Hospital.findById(req.body.hospitalId);
          if (!hospital) {
            return res.status(404).send({ hospital: 'Nothing found' });
          }
          var appointmentDetails = {
            'description': req.body.description,
            'doctor': req.body.doctor,
            'patient': req.user._id,
            'status': req.body.status,
            'appointmentDate': req.body.appointmentDate
          }
          console.log(req.body);
          const postDetails = await hospital.newAppointment(appointmentDetails);
          res.status(200).send(postDetails);
        } catch (e) {
          console.log(e);
          res.status(400).send(e);
        }
      });
      app.get('/getManagerAppoint', authenticate, async(req, res)=>{
        try {
          const hospitals = await Hospital.find({
            managerId: req.user._id, 
            $where: "this.appointmentRequest.length > 0" 
          });
          if (hospitals.length == 0)
            return res.status(404).send({ hospital: 'Nothing found' });

          const appoints = [];
          for (const hospital of hospitals) {
            for (let request of hospital.appointmentRequest) {
              const users = await User.find({
                _id: { $in: [request.doctor, request.patient] }
              });
              request = {users , request, hospitalname: hospital.name};
              appoints.push(request);
            }
          }
          res.send({ appoints });
        } catch (e) {
          res.status(400).send(e);
        }
      });
};  