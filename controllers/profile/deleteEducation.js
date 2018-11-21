// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   DELETE api/profile/education/:edu_id
// * @desc    Delete education from profile
// * @access  Private
const deleteEducation = (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);
        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }

  module.exports = deleteEducation;