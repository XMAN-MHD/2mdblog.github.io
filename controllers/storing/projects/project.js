/*
   module references 
*/
    // package references
    const path = require('path');
    // course's post model
const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
/*
    controller
*/ 
const storeProject = (req, res) => {
     // image uploaded handler
     let imageHandler = req.files.image;
     // validation
     imageHandler.mv(
         path.resolve(__dirname, '../../../public/assets/img/', imageHandler.name), 
         async (e) => {
             if (e) {
                console.error(e);
                return res.redirect('/projets/new')
             }
             await ProjectsPostModel.create(
                 {...req.body, postImage: '/assets/img/' + imageHandler.name, userId: req.session.userId},
                 (e, user) => {
                     if(e) 
                     {
                        console.error(e);
                        return res.redirect('/projets/new')
                     }
                     else
                     {
                        console.error(e);
                        return res.redirect('/')
                     } 
                 } 
             )
         }
     );     
}
/*
    give access store project's post controller
*/ 
module.exports = storeProject;