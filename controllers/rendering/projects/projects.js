/*
   module references 
*/
    // user model
    const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
    /*
        controller
    */ 
    const courses = async(req, res) => {
        const projectsPosts = await ProjectsPostModel.find({}).populate('userId');
        res.render(
            'projects/projects.ejs', 
            {
                projectsPosts: projectsPosts
            }
        );
    }
    /*
        give access to index controller
    */ 
    module.exports = courses;