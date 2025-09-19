const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const facultyRoutes = require('./routes/faculty.route');
const studentRoutes = require('./routes/student.route');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tuition_db';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Tuition Admin Panel API is running' });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});