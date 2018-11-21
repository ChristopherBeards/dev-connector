// * @route   GET api/profile/test
// * @desc    Tests profile route
// * @access  Public
const profileTest = (req, res) => res.json({ msg: 'Profile Works' });

module.exports = profileTest;