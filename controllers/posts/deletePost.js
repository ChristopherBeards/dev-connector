// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// * @route   DELETE api/posts/:id
// * @desc    Delete post by id
// * @access  Private
const deletePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        // Delete
        post.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
};

module.exports = deletePost;
