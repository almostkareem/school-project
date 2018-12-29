const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PatientSchema = new Schema({
    id: {type: Number, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Patient', PatientSchema);