const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// * Load Input Validation
const validateRegisterInput = require('../../validation/register');

// * Load User Model
const User = require('../../models/User');

// * @route   POST api/users/register
// * @desc    Register a user
// * @access  Public
const registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // * Size of Avatar
        r: 'pg', // * Rating
        d: 'mm', // * Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      // * Generates a salt for the given password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

module.exports = registerUser;
