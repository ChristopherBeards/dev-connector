// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   POST api/profile/user/:user_id
// * @desc    Get profile by user ID
// * @access  Public
const getById = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
};

module.exports = getById;
