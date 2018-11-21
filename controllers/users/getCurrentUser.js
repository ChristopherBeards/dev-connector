// * @route   GET api/users/current
// * @desc    Return current user
// * @access  Private
const getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

module.exports = getCurrentUser;
