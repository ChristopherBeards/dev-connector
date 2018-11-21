// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// * @route   POST api/posts/like/:id
// * @desc    Like post by ID
// * @access  Private
const likePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User already liked this post' });
        }
        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post
          .save()
          .then(post => res.status(200).json(post))
          .catch(err => {
            res.status(400).json(err);
          });
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
};

module.exports = likePost;
