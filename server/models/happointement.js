var mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['Hurry', 'Moderate', 'Time is there'],
        required: false
    },
    appointmentDate:{
        type: Number,
        required: true
    },
    createdOn:{
        type: Date,
        default: new Date()
    },
    appointmentStatus:{
        type: String,
        default: 'Upcoming',
        enum: ['Upcoming', 'Completed', 'Canceled', 'Time out']
    }
});
var Appointement = mongoose.model('Appointement', appointmentSchema);

module.exports = {appointmentSchema, Appointement};