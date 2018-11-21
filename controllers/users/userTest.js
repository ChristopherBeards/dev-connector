// * @route   GET api/users/test
// * @desc    Tests users route
// * @access  Public
const userTest = (req, res) => res.json({ msg: 'Users Works' });

module.exports = userTest;
