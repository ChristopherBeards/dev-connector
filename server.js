const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

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

// * Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
