  
const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
	img: { type: String, required: true },
	caption: { type: String, required: true, min:5, max:250 },
});

const Post = mongoose.model('posts', postSchema);

// Creating post
exports.createPost = function(obj, next) {
  const post = new Post(obj);
  console.log(post);
  post.save(function(err, post) {
    next(err, post);
  });
};