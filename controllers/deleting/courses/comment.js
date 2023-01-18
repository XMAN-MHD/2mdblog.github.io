/*
   module references 
*/
// package references
const CoursesPostModel = require('../../../models/courses/CoursesPost');

/*
    controller
*/ 
const deleteComment = async (req, res) => {
    // get the IDS
    const courseId = req.params.courseId;
    const commentId = req.params.commentId;
    try {
        // get the post
        const post = await CoursesPostModel.findById(courseId);
        // get the comments of the post  
        const comments = post.comments;
        // delete the comment 
        comments.splice(commentId, 1);
        // save the changes
        post.save();
        // return to the post view
        return res.redirect(`/courses/${courseId}`);
    } catch (error) {
        return res.render('404/notFound')
    }
}

/*
    give access to deleteComment controller
*/ 
module.exports = deleteComment;
