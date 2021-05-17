const postModel = require('../models/post');


// Creating post
exports.generatePosts = (req,res) => {

   const post = JSON.parse(req);
   console.log('post = '+post)
  
    postModel.createPost(post, function(err, postResult) {
      if(err){
        console.log(err);
        console.log('Could not create post. Please try again.');
      }
      else {
        console.log('success_msg', 'New post generated!');
      }
    }) 
};



