

// * @route   GET api/posts/test
// * @desc    Tests post route
// * @access  Public
const postTest = (req, res) => res.status(200).json({ msg: 'Posts Works' });

module.exports = postTest;