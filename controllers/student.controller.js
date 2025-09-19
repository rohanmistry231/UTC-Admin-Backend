const Student = require('../models/student.model');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch students: ${err.message}` });
  }
};

// Get one student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch student: ${err.message}` });
  }
};

// Create student
exports.createStudent = async (req, res) => {
  try {
    // Validate required fields
    const { name, standard, phone, address, examMarks } = req.body;
    if (!name || !standard || !phone || !address) {
      return res.status(400).json({ message: 'Name, standard, phone, and address are required' });
    }

    // Validate examMarks if provided
    if (examMarks && Array.isArray(examMarks)) {
      for (const mark of examMarks) {
        if (!mark.subject || mark.obtained == null || mark.outOf == null) {
          return res.status(400).json({ message: 'Each exam mark must have subject, obtained, and outOf' });
        }
        if (mark.obtained > mark.outOf) {
          return res.status(400).json({ message: `Obtained marks (${mark.obtained}) cannot exceed outOf (${mark.outOf}) for ${mark.subject}` });
        }
      }
    }

    const student = new Student({
      name,
      standard,
      phone,
      address,
      examMarks: examMarks || [],
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: `Failed to create student: ${err.message}` });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Validate required fields
    const { name, standard, phone, address, examMarks } = req.body;
    if (name != null) student.name = name;
    if (standard != null) student.standard = standard;
    if (phone != null) student.phone = phone;
    if (address != null) student.address = address;

    // Validate examMarks if provided
    if (examMarks && Array.isArray(examMarks)) {
      for (const mark of examMarks) {
        if (!mark.subject || mark.obtained == null || mark.outOf == null) {
          return res.status(400).json({ message: 'Each exam mark must have subject, obtained, and outOf' });
        }
        if (mark.obtained > mark.outOf) {
          return res.status(400).json({ message: `Obtained marks (${mark.obtained}) cannot exceed outOf (${mark.outOf}) for ${mark.subject}` });
        }
      }
      student.examMarks = examMarks;
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: `Failed to update student: ${err.message}` });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.deleteOne();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: `Failed to delete student: ${err.message}` });
  }
};