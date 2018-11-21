// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   DELETE api/profile/experience/:exp_id
// * @desc    Delete experience from profile
// * @access  Private
const deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);
      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
};

module.exports = deleteExperience;
