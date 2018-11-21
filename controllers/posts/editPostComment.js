// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// * @route   POST api/posts/edit
// * @desc    Edit post
// * @access  Private
const editPostComment = (req, res) => {
  const { postId, text, commentId } = req.body;

  // Confirm that the user exists
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      res.status(404).json({
        usernotfound: "We can't locate the user associated with this post...",
      });
    } else {
      // Locate the parent post
      Post.findById(postId)
        .then(post => {
          // Filter to get the desired comment
          let toUpdate = post.comments.filter(
            comment => comment._id.toString() === commentId
          )[0];

          // Set the comments' text to the new version
          toUpdate.text = text;

          // Save the updated post
          post
            .save()
            .then(updatedComment => {
              res.status(201).json(updatedComment);
            })
            .catch({ error: 'Error updating the comment.' });
        })
        .catch(err => {
          res
            .status(400)
            .json({ error: 'The associated post was not found.' });
        });
    }
  })
  .catch(err => {
    res
      .status(400)
      .json({ error: 'Error communicating with the database.' });
  });
};

module.exports = editPostComment;
