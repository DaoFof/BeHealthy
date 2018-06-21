const _ = require('lodash');
const mongoose = require('mongoose');
const {ObjectID} = require ('mongodb');
var {User} = require('../models/user');
var { Hospital } = require('../models/hospital');
var {authenticate} = require('../middleware/authenticate');

module.exports = function(app, upload){
    // POST /users
app.post('/users', async (req, res) => {
    try{
      const body = _.pick(req.body, 
        ['email', 'password', 'city', 'country','contact', 'userType']
      );
      body.firstName = req.body.name.firstName,
      body.lastName = req.body.name.lastName;
      
      const user = new User(body);
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).status(200).send(user);
    }catch(e){
      console.log(e);
      
      res.status(400).send(e);
    }
  });
  
  // GET ALL
  app.get('/users', /*authenticate,*/ async (req, res)=>{
    try {
      const users = await User.find({});
      res.send({users});
    } catch (e) {
      res.status(400).send(e);
    }
  });
  // GET BY ID 
  app.get('/user/:id', /*authenticate,*/ async (req, res) => {
    try {
      var id = req.params.id;
      if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
      const doctor = await User.findOne({
        _id: id
      });
      console.log(id);
      if (!doctor) {
        return res.status(404).send({ doctor: 'Nothing found' });
      }
      res.send({ doctor });
    } catch (e) {
      res.status(400).send(e);
    }
  });
  //GET BY TYPE 
  async function getElement(userType, res) {
    try {
      const users = await User.find({ userType });
      res.send({ users });
    } catch (e) {
      res.status(400).send(e);
    }
  }
  async function getOneElement(userType, _id, res) {
    try {
      const users = await User.findOne({ userType, _id});
      res.send({ users });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
  app.get('/patient',/*authenticate,*/ (req, res)=>{
    getElement("Patient", res);
  });
  app.get('/doctor',/*authenticate,*/async (req, res)=>{
   getElement("Doctor", res);
  });

  app.get('/doctor/:id',/*authenticate,*/async (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    getOneElement("Doctor",id, res);
  });

  app.get('/manager', authenticate, async (req, res)=>{
    getElement("Hospital Manager", res);
  });

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });
  // GET BY OPTION GIVEN
  
  function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }
  app.post('/byoption', authenticate, async (req, res)=>{
    try{
      const body = _.pick(req.body, 
        ['email', 'lastName', 'firstName', 'city', 'country','contact', 'userType']
      );
      clean(body);
     const users = await User.find(body);
      res.send({users});
    }catch(e){
      res.status(400).send(e);
    }
  });
  
  app.post('/users/login', async (req, res) => {
    try{
      console.log(req.body);
      
      const body = _.pick(req.body, ['email', 'password']);
      const user = await User.findByCredentials(body.email, body.password);
      if(user.allow == false){
        res.status(403).send({ 'msg': "You haven't been authorized yet!"})
      }
      const token = await user.generateAuthToken();      
      res.header('x-auth', token).send(user);
    }catch(e){
      console.log(e);
      res.status(400).send();
    }
  });
  
  app.delete('/users/me/token', authenticate, async (req, res) => {
    try{
      await req.user.removeToken(req.token);
      res.status(200).send();
    }catch(e){
      res.status(400).send();
    }
  });  


  app.patch('/user',authenticate, async  (req, res)=>{
    try{
      var body = req.body;
      var id =  req.user._id;
      const user = await User.findOneAndUpdate({_id : id},{$set : body}, {new : true});
      if(!user){
        return res.status(404).send();
      }
      res.send({user});
    }catch(e){
      console.log(e);
      res.status(400).send(e);
    }      
  });

  //add doctor hospital and add request to manager
  app.patch('/addDoctorHospital', authenticate, async (req, res) => {
    try {
      if(req.user.userType != 'Doctor'){
        return res.status(401).send({'userType': 'Different to doctor'});
      }
      var updateInfo = await req.user.addHospitals(req.body);
      if (!updateInfo) {
        return res.status(404).send();
      }
      for (const hospital of req.body) {
        let manager = await User.findById(hospital.managerId);
        let result = await manager.addDoctorRequest(req.user, hospital.hospitalName);
      }
      res.status(200).send({ updateInfo });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  app.patch('/acceptDoctorRequest', authenticate, async (req, res)=>{
    try{
      query= {
        "manager.doctorRequest._id": req.body.id
      }
      const user = await User.findOne(query);
      let result = await user.acceptDoctorRequest(req.body.id);
      const doctor = await User.findByIdAndUpdate(result.doctorId, { $set: {'allow': true} }, { new: true });
      res.status(200).send({doctor});
    }catch(e){
      console.log(e);
      res.status(400).send(e);
    }
  });
  app.patch('/denyDoctorRequest', authenticate, async (req, res)=>{
    try {
      query = {
        "manager.doctorRequest._id": req.body.id
      }
      const user = await User.findOne(query);
      let result = await user.denyDoctorRequest(req.body.id);
      res.status(200).send({ result });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  //End add doctor hospital and add request to manager
  //get manager patient
  app.get('/manager/patient', authenticate, async (req, res) => {
    try {
      var patientsIdList = req.user.manager.patientList;
      var patientList = [];

      for (const id of patientsIdList) {
        const user = await User.findById(id.patient);
        patientList.push(user);
      }
      res.status(200).send({ patientList });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  //end get manager patient
  //Appointment route for doctor
  app.patch('/docActionAppointRequest', authenticate, async (req, res) => {
    try {
      query = {
        "doctor.appointmentRequest._id": req.body.id
      }
      const user = await User.findOne(query);
      let result = await user.actionAppointRequest(req.body.id, req.body.decision);
      //const doctor = await User.findByIdAndUpdate(result.doctorId, { $set: { 'allow': true } }, { new: true });
      //update appointment if doctor deny 
      res.status(200).send({ result });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  app.get('/dashboard/doctor', authenticate, async (req, res) => {
    try {
      var hospitals = req.user.doctor.hospitals, 
        hospitalTosend = [],
        appointmentAccepts = req.user.doctor.appointmentAccepted,
        appointments = [],
        docPatients = [],
        usersIdList = [];
      for (const hospital of hospitals) {
        var temp = await Hospital.findById(hospital.hospitalId);
        hospitalTosend.push(temp);
        for (const appoint of temp.acceptedAppoint) {
          appointments.push(appoint);
        }
      }

      for(const acceptAppoint of appointmentAccepts){
        for (const appointment of appointments) {
          if (acceptAppoint.appointId.toString() == appointment._id.toString()){
            var user = await User.findById(appointment.patient);
            user._id = user._id.toString();
            usersIdList.push(user._id);
            docPatients.push(user);
          }
        }
      }
      
      res.status(200).send({ 'hospitals': hospitalTosend,'patients': docPatients});
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  //End appointment route for doctor
  //patient dashboard query
  app.get('/dashboard/patient', authenticate, async (req, res) => {
    try {
      var appointsIdList = req.user.patient.appointments;
      var hospitalList = [], doctorsIdList = [], doctorList = [];
      for (const id of appointsIdList) {
        const hospital = await Hospital.findOne({
          "acceptedAppoint._id": id.appointId
        });
        hospitalList.push(hospital);
        for (const appoint of hospital.acceptedAppoint) {
          if (doctorsIdList.indexOf(appoint.doctor.toString()) === -1){
            doctorsIdList.push(appoint.doctor.toString());
          }
        }
      }
      for (const id of doctorsIdList) {
        const user = await User.findById(id);
        doctorList.push(user);
      }
      res.status(200).send({ hospitalList, doctorList });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  //end
// user picture upload route
  app.post('/uploadFile', authenticate, async (req, res)=>{
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        res.status(502).send({err})
      }
      res.status(200).send({'user': req.user})

      // Everything went fine
    })
  });
}