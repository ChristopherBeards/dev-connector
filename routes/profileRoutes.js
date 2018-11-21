const {
  profileTest,
  getProfile,
  getAllProfiles,
  getByHandle,
  getById,
  addEditProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteUserAndProfile
} = require('../controllers/profile');

module.exports = (server, validation) => {
  server.route('/api/profile/test').get(profileTest);
  server.route('/api/profile').get(validation, getProfile);
  server.route('/api/profile/all').get(getAllProfiles);
  server.route('/api/profile/handle/:handle').get(getByHandle);
  server.route('/api/profile/user/:user_id').get(getById);
  server.route('/api/profile').post(validation, addEditProfile);
  server.route('/api/profile/experience').post(validation, addExperience);
  server.route('/api/profile/education').post(validation, addEducation);
  server.route('/api/profile/experience/:exp_id').delete(validation, deleteExperience);
  server.route('/api/profile/education/:edu_id').delete(validation, deleteEducation);
  server.route('/api/profile').delete(validation, deleteUserAndProfile);
};