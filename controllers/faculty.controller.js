const Faculty = require('../models/faculty.model');

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch faculty: ${err.message}` });
  }
};

// Get one faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch faculty: ${err.message}` });
  }
};

// Create faculty
exports.createFaculty = async (req, res) => {
  try {
    // Validate required fields
    const { name, standard, subjects, phone, address, age, email } = req.body;
    if (!name || !standard || !subjects || !phone || !address || age == null) {
      return res.status(400).json({ message: 'Name, standard, subjects, phone, address, and age are required' });
    }

    // Validate email format if provided
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate age
    if (age < 18) {
      return res.status(400).json({ message: 'Age must be at least 18' });
    }

    const faculty = new Faculty({
      name,
      standard,
      subjects,
      phone,
      address,
      age,
      email: email || undefined, // Set to undefined if empty to avoid storing empty string
    });

    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: `Failed to create faculty: ${err.message}` });
  }
};

// Update faculty
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // Validate required fields if provided
    const { name, standard, subjects, phone, address, age, email } = req.body;
    if (name != null) faculty.name = name;
    if (standard != null) faculty.standard = standard;
    if (subjects != null) faculty.subjects = subjects;
    if (phone != null) faculty.phone = phone;
    if (address != null) faculty.address = address;
    if (age != null) {
      if (age < 18) {
        return res.status(400).json({ message: 'Age must be at least 18' });
      }
      faculty.age = age;
    }
    if (email != null) {
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      faculty.email = email || undefined;
    }

    const updatedFaculty = await faculty.save();
    res.json(updatedFaculty);
  } catch (err) {
    res.status(400).json({ message: `Failed to update faculty: ${err.message}` });
  }
};

// Delete faculty
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    await faculty.deleteOne();
    res.json({ message: 'Faculty deleted' });
  } catch (err) {
    res.status(500).json({ message: `Failed to delete faculty: ${err.message}` });
  }
};