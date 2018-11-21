const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// * Load Input Validation
const validateLoginInput = require('../../validation/login');

// * Load User Model
const User = require('../../models/User');

// * @route   GET api/users/login
// * @desc    Login User / Returning JWT Token
// * @access  Public
const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // * Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found!';
      return res.status(404).json(errors);
    }
    // Check the given password with the saved hashed pw associated with the user
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        /* Sign Token
        https://github.com/auth0/node-jsonwebtoken
        Payload = What we want to include in the token
        Expiration = How long we want the token to last
        Bearer = A common protocol 
        */
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          },
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports = loginUser;