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
        // retrieve the errors from flash library
        let errors = req.flash('validationErrors');
        if(errors !== undefined) 
        {
            console.log('validation errors: ' + errors) 
        }
        // find the post
        const postToUpdate = await CoursesPostModel.findById(postId);
        console.log(postToUpdate.message)
        res.render(
            'courses/updateCourse', 
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