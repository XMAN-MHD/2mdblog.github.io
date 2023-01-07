/*
   module references 
*/
    // models
const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
const UserModel = require('../../../models/users/User');
    /*
        controller
    */ 
    const renderProject = async (req, res) => {
        let deletePost = false;
        let userEmail = true;
        let postAuthorEmail = false;
        const post = await ProjectsPostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username', 'email']});
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
            'projects/project', 
            {
                project: post, 
                deletePost: deletePost
            }
        );
    }
    /*
        give access to renderCourse controller
    */ 
    module.exports = renderProject;