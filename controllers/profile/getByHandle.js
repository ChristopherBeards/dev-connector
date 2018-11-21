// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   POST api/profile/handle/:handle
// * @desc    Get profile by handle
// * @access  Public
const getByHandle = (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
};

module.exports = getByHandle;
