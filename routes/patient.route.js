const express = require('express');
const router = express.Router();

const patient_controller = require('../controllers/patient.controller');

router.get('/', patient_controller.patients_list);
router.post('/create', patient_controller.patient_create);
router.post('/add/signal', patient_controller.patient_add_signal);
router.get('/:id', patient_controller.patient_details);

module.exports = router;