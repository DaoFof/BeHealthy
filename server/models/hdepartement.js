var mongoose = require('mongoose');

var DepartmentSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
})
var Departement = mongoose.model('Departement', DepartmentSchema);

module.exports = {Departement};