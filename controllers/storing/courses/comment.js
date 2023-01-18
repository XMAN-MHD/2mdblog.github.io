/*
   module references 
*/
    // models
    const CoursesPostModel = require('../../../models/courses/CoursesPost');
    const UserModel = require('../../../models/users/User');
    
    const storeComment = async (req, res) => {
        // get the author of the comment
        let authorOfComment = null; 
        let authorIdOfComment = null;
        // retrieve current user
        const user = await UserModel.findById(req.session.userId);
        // get the id and username if  the user  is retrieved
        if(user)
        {
            authorIdOfComment = user._id;
            authorOfComment = user.username;
             // get the current courses post by its id send as params in the url 
            const post = await CoursesPostModel.findById(req.params.id);
            if(post)
            {
                // create an object that store the comment
                const commentToSave = {authorId: authorIdOfComment, author: authorOfComment, ...req.body};
                // add the comment to the array of the comments
                post.comments.unshift(commentToSave);
                // save the changes applied to current course post
                await post.save();
                // redirect the user to the current courses post view
                return res.redirect(`/courses/${post._id}`);
            }
        }
       
        return res.redirect(`/courses`);
    };
    
    // give access to the storecomment controller for the server
    module.exports = storeComment;
    