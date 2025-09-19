const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  subjects: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Keep validation, remove unique
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Faculty', facultySchema);