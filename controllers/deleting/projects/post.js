/*
   module references 
*/
// package references
const ProjectsPostModel = require('../../../models/projects/ProjectsPost');

/*
    controller
*/ 
const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        // find and delete the post
        const deletedPost = await ProjectsPostModel.findByIdAndDelete(postId);
        // if the post was not found, return an error
        if (!deletedPost) {
            return res.render('404/notFound')
        }
        // return to home page
        return res.redirect('/projets');
    } catch (error) {
        return res.render('404/notFound')
    }
}

/*
    give access to deletePost controller
*/ 
module.exports = deletePost;