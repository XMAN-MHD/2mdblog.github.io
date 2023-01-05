/*
   module references 
*/
    // user model
const BlogPostModel = require('../../../models/blog/BlogPost');
/*
    controller
*/ 
const home = async (req, res) => {
    let searching = false;
    const posts = await BlogPostModel.find({}).populate({path:'userId', select:['_id', 'username']});
    res.render(
        'home/home.ejs', 
        {
            posts: posts, 
            searching: searching
        }
    );
}
/*
    give access to index controller
*/ 
module.exports = home;