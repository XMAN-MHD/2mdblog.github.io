/*
   module references 
*/
// package references
const CoursesPostModel = require('../../../models/courses/CoursesPost');

/*
    controller
*/ 
const updateComment = async (req, res) => {
    // get the IDS
    const courseId= req.params.courseId;
    const commentId = req.params.commentId;
    try 
    {
        // get the post
        const post = await CoursesPostModel.findById(courseId);
        // get the comments of the post  
        const comments = post.comments;
        // get the comment 
        const comment = comments[commentId];
        // update the the message of the comment
        comment.body = req.body.body;
        // save the changes
        post.save();
        // return to the post view
        return res.redirect(`/courses/${courseId}`);
    } 
    catch (error) {
        console.error(error.message)
        return res.redirect('/404')
    }
}

/*
    give access to updateComment controller
*/ 
module.exports = updateComment;
