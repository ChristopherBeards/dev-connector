// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   GET api/profile
// * @desc    Get current users profile
// * @access  Private
const getProfile = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
};

module.exports = getProfile;
