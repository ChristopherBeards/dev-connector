// Post model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// * @route   POST api/posts
// * @desc    Create post
// * @access  Private
const addPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost.save().then(post => res.status(200).json(post));
};

module.exports = addPost;