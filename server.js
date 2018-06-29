const express = require('express');
const mongoose = require('mongoose');

// * Initialze a Variable to Express
const app = express();

// * DB Config
const db = require('./config/keys').mongoURI;

// * Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// * Test Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// * Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
