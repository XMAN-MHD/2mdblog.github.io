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
        let userId = null;
        try{
            // get the post to render
            const post = await ProjectsPostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username', 'email']});
            // get the logged in user
            const user = await UserModel.findById(req.session.userId);
            // if the user created  the post thus the user can delete it
            if(user && post)
            {
                if (user._id.equals(post.userId._id)) 
                {
                    deletePost = true;
                }
                userId = user._id;
               }
            res.render(
                'projects/project', 
                {
                    project: post, 
                    deletePost,
                    userId
                }
            );
        }
        catch(e)
        {
            res.render('404/notFound')
        }
    }
    /*
        give access to renderCourse controller
    */ 
    module.exports = renderProject;