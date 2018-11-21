// Post model
const Post = require('../../models/Post');

// * @route   GET api/posts/:id
// * @desc    Get post by id
// * @access  Public
const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(404).json({ error: 'No post found by that ID' }));
};

module.exports = getPost;