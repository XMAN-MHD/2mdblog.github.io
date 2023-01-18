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
        let userId = null;
        try{
            // get the post to render
            const post = await PostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username', 'email']});
            // get the logged in user
            const user = await UserModel.findById(req.session.userId);
            // if the user created  the post can delete it
            if(user && post)
            {
                if (user._id.equals(post.userId._id)) 
                {
                    deletePost = true;
                }
                userId = user._id;
            }
            res.render(
                'blog/post', 
                {
                    post,
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
        give access to getPost controller
    */ 
    module.exports = post;