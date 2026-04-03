const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { connectDB } = require('./db');
const { contactRoutes } = require('../lib');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// 🔥 ONLY THIS
app.use('/api', contactRoutes);

app.listen(5000, async () => {
  await connectDB();
  console.log('Server running...');
});