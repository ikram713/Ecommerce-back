const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = 5000;
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve image files
app.use('/api/items', itemRoutes); // All item routes

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
});
