// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// * @route   POST api/posts/unlike/:id
// * @desc    Unlike post by ID
// * @access  Private
const unlikePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this post' });
        }
        // Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.status(200).json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
};

module.exports = unlikePost;
