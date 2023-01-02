/*
   module references 
*/
    // user model
const CoursesPostModel = require('../../../models/courses/CoursesPost');
/*
    controller
*/ 
const courses = async(req, res) => {
    const coursesPosts = await CoursesPostModel.find({}).populate({path:'userId', select:['_id', 'username']});
    res.render(
        'courses/courses.ejs', 
        {
            coursesPosts: coursesPosts
        }
    );
}
/*
    give access to index controller
*/ 
module.exports = courses;