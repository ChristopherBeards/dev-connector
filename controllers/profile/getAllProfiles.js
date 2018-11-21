// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   POST api/profile/all
// * @desc    Get all profiles
// * @access  Public
const getAllProfiles = (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.profile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: 'There are no profiles' });
    });
};

module.exports = getAllProfiles;
