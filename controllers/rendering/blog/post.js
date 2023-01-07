/*
   module references 
*/
    // modelq
    const PostModel = require('../../../models/blog/BlogPost');
    const UserModel = require('../../../models/users/User');

    /*
        controller
    */ 
    const post = async (req, res) => {
        let deletePost = false;
        let userEmail = true;
        let postAuthorEmail = false;
        const post = await PostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username', 'email']});
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
            'blog/post', 
            {
                post: post,
                deletePost: deletePost
            }
        );
    }
    /*
        give access to getPost controller
    */ 
    module.exports = post;