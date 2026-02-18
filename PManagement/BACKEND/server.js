const express = require('express');
const cors = require('cors'); // Keep this one at the top
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors()); // This activates CORS for all routes
app.use(express.json());

// ... rest of your code (connectDB, routes, etc.)

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks')); // 👈 Added this for Task Management

// Global Error Handling Middleware (Best Practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

