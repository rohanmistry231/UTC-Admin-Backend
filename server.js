// Import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // ✅ Added Helmet for security
const path = require('path');

// Import routes
const facultyRoutes = require('./routes/faculty.route');
const studentRoutes = require('./routes/student.route');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tuition_db';

// ------------------- Middleware ------------------- //

// Helmet security configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "https://vercel.live"], // ✅ allow vercel live reload
        "connect-src": ["'self'", "https://vercel.live"],
      },
    },
  })
);

// CORS configuration - Allow all (adjust later if needed)
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods
    allowedHeaders: "*", // Allow all headers
    credentials: true, // Allow credentials (optional)
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------- Root Endpoint ------------------- //
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tuition Admin Panel API is running',
    endpoints: {
      faculty: "/api/faculty",
      students: "/api/students"
    }
  });
});

// ------------------- MongoDB Connection ------------------- //
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit app on DB error
  });

// ------------------- Routes ------------------- //
app.use('/api/faculty', facultyRoutes);
app.use('/api/students', studentRoutes);

// ------------------- Error Handling ------------------- //
// Handle 404 (undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "An internal server error occurred" });
});

// ------------------- Start Server ------------------- //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
