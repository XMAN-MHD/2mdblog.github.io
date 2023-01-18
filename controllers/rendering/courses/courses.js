/*
   module references 
*/
    // user model
const CoursesPostModel = require('../../../models/courses/CoursesPost');
/*
    controller
*/ 
const courses = async(req, res) => {
    // check if  we are searching or not
    let searching = false;
    // retrieve all the courses posts from its collection
    const coursesPosts = await CoursesPostModel.find({}).populate({path:'userId', select:['_id', 'username']});
    // rende the view and pass it some data 
    res.render(
        'courses/courses.ejs', 
        {
            coursesPosts: coursesPosts,
            searching
        }
    );
}
/*
    give access to courses controller
*/ 
module.exports = courses;