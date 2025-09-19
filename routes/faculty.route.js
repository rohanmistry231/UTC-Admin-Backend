const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getFacultyById);
router.post('/', facultyController.createFaculty);
router.put('/:id', facultyController.updateFaculty);
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;