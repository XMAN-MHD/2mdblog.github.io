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
    // retrieve the errors from flash library
    let errors = req.flash('validationErrors');
    if(errors !== undefined) 
    {
        console.log('validation errors: ' + errors)
    }
    // find the post
    const postToUpdate = await PostModel.findById(postId);
    res.render(
        'blog/updatePost', 
        {
            editor: true, 
            postToUpdate:postToUpdate,
            errors:errors
        } 
    );
}
/*
    give access to update post controller
*/ 
module.exports = updatePost;