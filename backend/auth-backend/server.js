// auth-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);  // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
