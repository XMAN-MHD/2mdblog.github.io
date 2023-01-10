/*
   module references 
*/
// package references
const PostModel = require('../../../models/blog/BlogPost');

/*
    controller
*/ 
const updateComment = async (req, res) => {
    // get the IDS
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    try 
    {
        // get the post
        const post = await PostModel.findById(postId);
        // get the comments of the post  
        const comments = post.comments;
        // get the comment 
        const comment = comments[commentId];
        // update the the message of the comment
        comment.body = req.body.body;
        // save the changes
        post.save();
        // return to the post view
        return res.redirect(`/posts/${postId}`);
    } 
    catch (error) {
        return res.render('404/notFound')
    }
}

/*
    give access to updateComment controller
*/ 
module.exports = updateComment;
