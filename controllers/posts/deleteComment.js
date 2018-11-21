// Post model
const Post = require('../../models/Post');

// * @route   DELETE api/posts/comment/:id/:comment_id
// * @desc    Delete comment from post
// * @access  Private
const deleteComment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentdoesntexist: 'Comment does not exist' });
      } else {
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);
        post
          .save()
          .then(post => res.status(200).json(post))
          .catch(err => {
            res
              .status(400)
              .json({
                error: 'Something went wrong deleting the comment.',
                err,
              });
          });
      }
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
};

module.exports = deleteComment;
