const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SignalPatientSchema = new Schema({
    patient_id: { type: Number, required: true, max: 100 },
    signal: { type: Number, required: true },
});


// Export the model
module.exports = mongoose.model('SignalPatient', SignalPatientSchema);