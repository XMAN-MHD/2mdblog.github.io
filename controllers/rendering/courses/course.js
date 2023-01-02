/*
   module references 
*/
    // user model
    const CoursesPostModel = require('../../../models/courses/CoursesPost');
    /*
        controller
    */ 
    const renderCourse = async (req, res) => {
        const courses = await CoursesPostModel.findById(req.params.id).populate({path:'userId', select:['_id', 'username']});
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