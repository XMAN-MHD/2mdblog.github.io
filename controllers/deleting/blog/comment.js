/*
   module references 
*/
// package references
const PostModel = require('../../../models/blog/BlogPost');

/*
    controller
*/ 
const deleteComment = async (req, res) => {
    // get the IDS
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    try {
        // get the post
        const post = await PostModel.findById(postId);
        // get the comments of the post  
        const comments = post.comments;
        // delete the comment 
        comments.splice(commentId, 1);
        // save the changes
        post.save();
        // return to the post view
        return res.redirect(`/posts/${postId}`);
    } catch (error) {
        return res.render('404/notFound')
    }
}

/*
    give access to deleteComment controller
*/ 
module.exports = deleteComment;
