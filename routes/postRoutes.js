const {
  postTest,
  getPost,
  getPosts,
  addPost,
  editPostComment,
  deletePost,
  likePost,
  unlikePost,
  deleteComment,
  addComment
} = require('../controllers/posts');

module.exports = (server, validation) => {
  server.route('/api/posts/test').get(postTest);
  server.route('/api/posts/:id').get(validation, getPost);
  server.route('/api/posts').get(validation, getPosts);
  server.route('/api/posts').post(validation, addPost);
  server.route('/api/posts/:id').delete(validation, deletePost);
  server.route('/api/posts/like/:id').post(validation, likePost);
  server.route('/api/posts/unlike/:id').post(validation, unlikePost);
  server.route('/api/posts/comment/edit').post(validation, editPostComment);
  server.route('/api/posts/comment/:id').post(validation, addComment);
  server.route('/api/posts/comment/:id/:comment_id').delete(validation, deleteComment);
};