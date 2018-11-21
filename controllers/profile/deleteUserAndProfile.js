// * Load Profile Model
const Profile = require('../../models/Profile');
// * Load User Model
const User = require('../../models/User');

// * @route   DELETE api/profile
// * @desc    Delete user and profile
// * @access  Private
const deleteUserAndProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
};

module.exports = deleteUserAndProfile;
