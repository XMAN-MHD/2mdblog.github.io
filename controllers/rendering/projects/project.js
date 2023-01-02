/*
   module references 
*/
    // user model
    const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
    /*
        controller
    */ 
    const renderProject = async (req, res) => {
        const projects = await ProjectsPostModel.findById(req.params.id).populate('userId');
        res.render(
            'projects/project', 
            {
                projects: projects
            }
        );
    }
    /*
        give access to renderCourse controller
    */ 
    module.exports = renderProject;