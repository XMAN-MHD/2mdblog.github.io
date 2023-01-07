    /*
    module references 
    */
    // package references
    const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
    /*
        controller
    */  
    const updatePost = async (req, res) => {
        // get the post id
        const postId = req.params.id;
        // find the post
        const postToUpdate = await ProjectsPostModel.findById(postId);
        res.render(
            'projects/updateProject', 
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