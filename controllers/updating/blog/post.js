/*
   module references 
*/
    // package references
const PostModel = require('../../../models/blog/BlogPost');
/*
    controller
*/  
const updatePost = async (req, res) => {
    // get the post id
    const postId = req.params.id;
    // find the post
    const postToUpdate = await PostModel.findById(postId);
    res.render(
        'blog/updatePost', 
        {
            editor: true, 
            postToUpdate:postToUpdate
        } 
        
    );
}
/*
    give access to update post controller
*/ 
module.exports = updatePost;