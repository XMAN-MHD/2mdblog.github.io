/*
   module references 
*/
    // user model
    const ProjectsPostModel = require('../../../models/projects/ProjectsPost');
    /*
        controller
    */ 
    const courses = async(req, res) => {
        // check if we ara searching or not
        let searching = false;
        // retrieve all projects post from its collection
        const projectsPosts = await ProjectsPostModel.find({}).populate({path:'userId', select:['_id', 'username']});
        // render the view and pass it some data
        res.render(
            'projects/projects.ejs', 
            {
                projectsPosts, 
                searching
            }
        );
    }
    /*
        give access to index controller
    */ 
    module.exports = courses;