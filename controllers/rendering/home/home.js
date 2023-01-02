/*
   module references 
*/
    // user model
const PostModel = require('../../../models/blog/BlogPost');
/*
    controller
*/ 
const home = async (req, res) => {
    const posts = await PostModel.find({}).populate('userId');
    res.render(
        'home/home.ejs', 
        {
            posts: posts
        }
    );
}
/*
    give access to index controller
*/ 
module.exports = home;