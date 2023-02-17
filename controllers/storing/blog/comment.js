/*
   module references 
*/
    // models
const BlogPostModel = require('../../../models/blog/BlogPost');
const UserModel = require('../../../models/users/User');

const storeComment = async (req, res) => {
    let authorOfComment = null; 
    let authorIdOfComment = null;
    // retrieve current user
    const user = await UserModel.findById(req.session.userId);
    // get the id and username if  the user  is retrieved
    if(user)
    {
        // get the author of the comment
        authorIdOfComment = user._id;
        authorOfComment = user.username;
        // get the current blog post by its id send as params in the url 
        const post = await BlogPostModel.findById(req.params.id);
        if(post)
        {
            // create an object that store the comment
            const commentToSave = {authorId: authorIdOfComment, author: authorOfComment, ...req.body};
            // add the comment to the array of the comments
            post.comments.unshift(commentToSave);
            // save the changes applied to current blog post
            await post.save();
            // redirect the user to the current blog post view
            return res.redirect(`/posts/${post._id}`);
        }
    }
    return res.redirect(`/`);
};

// give access to the storecomment controller for the server
module.exports = storeComment;
