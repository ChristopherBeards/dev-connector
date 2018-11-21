// * Load Profile Model
const Profile = require('../../models/Profile');

// * Load Validation
const validateProfileInput = require('../../validation/profile');

// * @route   POST api/profile
// * @desc    Create or Edit user profile
// * @access  Private
const addEditProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // * Check Validation
  if (!isValid) {
    // * Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // * Get Fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  // * Skills - Split Into Array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // * Social Links
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // * Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // * Create

      // * Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // * Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

module.exports = addEditProfile;
