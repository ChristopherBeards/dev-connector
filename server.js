const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// * Route Imports
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// * Initialze a Variable to Express
const app = express();

// * Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * DB Config
const db = require('./config/keys').mongoURI;

// * Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// * Passport Middleware
app.use(passport.initialize());

// * Passport Config
require('./config/passport.js')(passport);

// * Port
const port = process.env.PORT || 5000;

// * Use Routes
userRoutes(app, passport.authenticate('jwt', { session: false }));
profileRoutes(app, passport.authenticate('jwt', { session: false }));
postRoutes(app, passport.authenticate('jwt', { session: false }));


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;