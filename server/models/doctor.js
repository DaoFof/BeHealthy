var mongoose = require('mongoose');

var DoctorSchema = mongoose.Schema({
medicalField/*Departement*/:{
    type: String,
    required: false,
},
department:{
    type: mongoose.Schema.Types.ObjectId,
    required: false
},
studiedIn:{
    type: String,
    /*required: true,*/
},
hospitals:[{
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: false // MAKE IT TRUE LATER
    },
}],
appointmentRequest: [{
    appointId:{
        type: mongoose.Schema.Types.ObjectId
    }
}],
appointmentAccepted: [{
    appointId: {
        type: mongoose.Schema.Types.ObjectId
    }
}],
expertiseRate:{
    type: Number,
    /*required: true,*/
    default: 0
}
});

var Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = {Doctor, DoctorSchema};