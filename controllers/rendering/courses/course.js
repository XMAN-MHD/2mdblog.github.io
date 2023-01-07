/*
   module references 
*/
    // models
    const CoursesPostModel = require('../../../models/courses/CoursesPost');
    const UserModel = require('../../../models/users/User');

    /*
        controller
    */ 
    const renderCourse = async (req, res) => {
        let deletePost = false;
        let userEmail = true;
        let postAuthorEmail = false;
        const post = await CoursesPostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username', 'email']});
        if(post)
        {
            postAuthorEmail = post.userId.email;
        }
        const user = await UserModel.findById(req.session.userId);
        if (user) 
        {
            userEmail = user.email;
        }
        if (userEmail  === postAuthorEmail) 
        {
            deletePost = true;
        }
        res.render(
            'courses/course', 
            {
                course: post,
                deletePost: deletePost
            }
        );
    }
    /*
        give access to renderCourse controller
    */ 
    module.exports = renderCourse;