/*
   module references 
*/
// package references
const PostModel = require('../../../models/blog/BlogPost');

/*
    controller
*/ 
const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        // find and delete the post
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        // if the post was not found, return an error
        if (!deletedPost) {
            return res.render('404/notFound')
        }
        // return to home page
        return res.redirect('/');
    } catch (error) {
        console.error(error)
        return res.redirect('/404')
    }
}

/*
    give access to deletePost controller
*/ 
module.exports = deletePost;
