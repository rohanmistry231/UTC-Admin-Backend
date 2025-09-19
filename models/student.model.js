const mongoose = require('mongoose');

const examMarkSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  obtained: {
    type: Number,
    required: true,
  },
  outOf: {
    type: Number,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  standard: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  examMarks: [examMarkSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);