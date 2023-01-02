/*
    module references
*/
    // user model
const BlogPostModel = require('../../../models/blog/BlogPost');   
const UserModel = require('../../../models/users/User');    

/*
    controller
*/ 
const user = async (req, res) => {
    let posts = null;
    let user = null;
    user = await UserModel.findById(req.session.userId);
    posts = await BlogPostModel.find({userId: req.session.userId}); 
    res.render(
        'users/account', 
        {
            posts: posts, 
            user: user
        }
    );
}
/*
    give access to index controller
*/ 
module.exports = user;