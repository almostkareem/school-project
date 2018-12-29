const Patient = require('../models/patient.model');
const SignalPatient = require('../models/signalpatient.model');

exports.patient_create = function (req, res, next) {

    var countModel = Patient.estimatedDocumentCount({}, function (err, count) {

        let patient = new Patient(
            {
                id: count + 1
            }
        );

        patient.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Patient N # ' + (count + 1) + ' créé avec succés');
        });

    });
};

exports.patient_add_signal = function (req, res, next) {

    var countModel = Patient.estimatedDocumentCount({}, function (err, count) {

        let signalpatient = new SignalPatient(
            {
                patient_id: count,
                signal: req.body.signal
            }
        );

        signalpatient.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Signal pour Patient N # ' + count + ' inseré avec succés');
        });

    });
};

exports.patients_list = function (req, res, next) {

    Patient.find(function (err, patients) {
        if (err) return next(err);
        res.render('patients', { patients: patients });
    });

};

exports.patient_details = function (req, res, next) {

    Patient.findOne({ id: req.params.id }, function (err, patient) {
        if (err) return next(err);

        SignalPatient.find({ patient_id: req.params.id }, function (err, signals) {
            if (err) return next(err);
            var array_signals = [];

            signals.forEach(function (signal) {
                array_signals.push(signal.signal);
            });

            res.render('patient_detail', { id: patient.id, signals: array_signals });
        });
    });
};