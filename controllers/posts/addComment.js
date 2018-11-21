// Post model
const Post = require('../../models/Post');
// Validation
const validatePostInput = require('../../validation/post');

// * @route   POST api/posts/comment/:id
// * @desc    Add comment to post
// * @access  Private
const addComment = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.status(200).json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
};

module.exports = addComment;
