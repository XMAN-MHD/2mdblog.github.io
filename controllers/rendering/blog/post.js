/*
   module references 
*/
    // user model
    const PostModel = require('../../../models/blog/BlogPost');

    /*
        controller
    */ 
    const home = async (req, res) => {
        const posts = await PostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username']});
        res.render(
            'blog/post', 
            {
                posts: posts
            }
        );
    }
    /*
        give access to getPost controller
    */ 
    module.exports = home;