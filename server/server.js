const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true
}
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/company', require('./routes/companyRoutes'));
app.use('/api/v1/job', require('./routes/jobRoutes'));
app.use('/api/v1/application', require('./routes/applicationRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
