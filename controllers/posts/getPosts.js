// Post model
const Post = require('../../models/Post');

// * @route   GET api/posts
// * @desc    Get posts
// * @access  Public
const getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(404).json({ error: 'No posts found' }));
};

module.exports = getPosts;