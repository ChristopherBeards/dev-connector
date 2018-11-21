const validateEducationInput = require('../../validation/education');

// * Load Profile Model
const Profile = require('../../models/Profile');

// * @route   POST api/profile/education
// * @desc    Add education to profile
// * @access  Private
const addEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // * Check Validation
  if (!isValid) {
    // * Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    // * Add to exp array
    profile.education.unshift(newEdu);
    profile.save().then(profile => res.json(profile));
  });
};

module.exports = addEducation;
