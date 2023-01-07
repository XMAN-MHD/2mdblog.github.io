/*
   module references 
*/
    // package references
const path = require('path');
    // models
const CoursesPostModel = require('../../../models/courses/CoursesPost');
/*
    controller
*/ 
const updatePost = (req, res) => {
    // image uploaded handler
    let imageHandler = req.files.image;
    
    imageHandler.mv(
        path.resolve(__dirname, '../../../public/assets/img/', imageHandler.name), //store the image and rename it
        async(e) => {
            if (e) 
            {
               return res.redirect(`/courses/${req.params.id}/update`) // if not stored go back
            }
            try // find the post and update it
            {
                await CoursesPostModel.findByIdAndUpdate(
                    req.params.id,
                    {...req.body, postImage: '/assets/img/' + imageHandler.name}
                )
            } 
            catch(e) 
            {
                return res.redirect(`/courses/${req.params.id}/update`) // if not updated go back
            }
            return res.redirect('/courses')  // if updated go to the list of posts
        }
    ) 
} 
 
/*
    give access to update post controller
*/ 
module.exports = updatePost;