var mongoose = require('mongoose');
var { appointmentSchema } = require('./happointement');
var HospitalSchema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
        /*unique: true*/
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },lat: {
        type: String,
        required: false
    },
    lng: {
        type: String,
        required: false
    }, 
    contact:{
        type: String,
        required:function() {
            return this.email == "" || this.email == undefined || this.email == null
        }
    },
    email:{
        type: String,
        required: false,
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: String,
        /*require: true,*/
    },
    expertiseRate:{
        type: Number,
        /*require: true,*/
        default: 0
    },
    departments:[{
        departmentId:{
            type: String,
            required: true
        },
        departmentName:{
            type: String,
            required: false // MAKE IT TRUE LATER
        },
        expertiseRate:{
            type: Number,
            default: 0
        }
    }],
    appointmentRequest : [appointmentSchema],
    acceptedAppoint: [appointmentSchema]
});

HospitalSchema.methods.addDepartment = async function (depart){
    var hospital = this;
    var update = {
        $push:{
            departments:{
                department:{
                    departmentId: depart.id,
                    name: depart.name
                }
            }
        }
    }
    return await hospital.update(update);
};
//Add Delete department method later

//appointment method 
HospitalSchema.methods.newAppointment = async function(details){
    var hospital = this;
    var update = {
        $push:{
            appointmentRequest: details
        }
    }
    return await hospital.update(update);
}
function findRequest(id, hospital) {
    for (const request of hospital.appointmentRequest) {
        if (request._id == id) {
            return request
        }
    }
}
HospitalSchema.methods.acceptAppoint = async function(id){
    var hospital = this;
    var request = findRequest(id, hospital);
    var update = {
        $pull: {
            "appointmentRequest": findRequest(id, hospital)
        },
        $push: {
            "acceptedAppoint": findRequest(id, hospital)
        }
    }
    var res = await hospital.update(update);
    return { res, request}
}

HospitalSchema.methods.denyAppoint = async function (id) {
    var hospital = this;
    var request = findRequest(id, hospital);
    var update = {
        $pull: {
            "appointmentRequest": findRequest(id, hospital)
        }
    }
    var res = await hospital.update(update);
    return { res, request }
}
var Hospital =  mongoose.model('Hospital', HospitalSchema);

module.exports = {Hospital, HospitalSchema};