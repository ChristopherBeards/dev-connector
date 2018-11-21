const {
  userTest,
  registerUser,
  loginUser,
  getCurrentUser
} = require('../controllers/users');

module.exports = (server, validation) => {
  server.route('/api/users/test').get(userTest);
  server.route('/api/users/register').post(registerUser);
  server.route('/api/users/login').post(loginUser);
  server.route('/api/users/current').get(validation, getCurrentUser);
};