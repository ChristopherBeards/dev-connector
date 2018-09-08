// https://github.com/themikenicholson/passport-jwt
const JwtStrategy = require('passport-jwt').Strategy;
// * Extract = extracts the user data from the given payload
const ExtractJwt = require('passport-jwt').ExtractJwt;
// * Mongoose = To search for the user that comes with the payload
const mongoose = require('mongoose');
// * User model
const User = mongoose.model('users');
// * The key is sent with the request, we need it for validation
const keys = require('../config/keys');
// * Empty object for our options
const opts = {};
// * Specify that we're using a `Bearer Token`

/* 
Options is an object literal containing options to control how the token is extracted from the request or verified.
*/
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

/* Documentation
https://www.npmjs.com/package/passport-jwt 
*/
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }),
  );
};
