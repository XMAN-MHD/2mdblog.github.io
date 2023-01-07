    /*
    module references 
    */
    // package references
    const CoursesPostModel = require('../../../models/courses/CoursesPost');
    /*
        controller
    */  
    const updatePost = async (req, res) => {
        // get the post id
        const postId = req.params.id;
        // find the post
        const postToUpdate = await CoursesPostModel.findById(postId);
        res.render(
            'courses/updateCourse', 
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