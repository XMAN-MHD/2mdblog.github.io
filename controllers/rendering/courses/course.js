/*
   module references 
*/
    // user model
    const CoursesPostModel = require('../../../models/courses/CoursesPost');
    /*
        controller
    */ 
    const renderCourse = async (req, res) => {
        const courses = await CoursesPostModel.findById(req.params.id).populate('userId');
        res.render(
            'courses/course', 
            {
                courses: courses
            }
        );
    }
    /*
        give access to renderCourse controller
    */ 
    module.exports = renderCourse;