/*
   module references 
*/
// package references
const ProjectsPostModel = require('../../../models/projects/ProjectsPost');

/*
    controller
*/ 
const updateComment = async (req, res) => {
    // get the IDS
    const projectId= req.params.projectId;
    const commentId = req.params.commentId;
    try 
    {
        // get the post
        const post = await ProjectsPostModel.findById(projectId);
        // get the comments of the post  
        const comments = post.comments;
        // get the comment 
        const comment = comments[commentId];
        // update the the message of the comment
        comment.body = req.body.body;
        // save the changes
        await post.save();
        // return to the post view
        return res.redirect(`/projets/${projectId}`);
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
