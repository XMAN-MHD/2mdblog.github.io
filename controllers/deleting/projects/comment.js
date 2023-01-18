/*
   module references 
*/
// package references
const ProjectsPostModel = require('../../../models/projects/ProjectsPost');

/*
    controller
*/ 
const deleteComment = async (req, res) => {
    // get the IDS
    const projectId = req.params.projectId;
    const commentId = req.params.commentId;
    try {
        // get the post
        const post = await ProjectsPostModel.findById(projectId);
        // get the comments of the post  
        const comments = post.comments;
        // delete the comment 
        comments.splice(commentId, 1);
        // save the changes
        post.save();
        // return to the post view
        return res.redirect(`/projets/${projectId}`);
    } catch (error) {
        return res.render('404/notFound')
    }
}

/*
    give access to deleteComment controller
*/ 
module.exports = deleteComment;
