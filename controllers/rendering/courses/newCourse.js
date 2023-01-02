/*
    controller
*/ 
const newCourse = (req, res) => {
    res.render(
        'courses/newcourse', 
        {editor: true}
    );
}
/*
    give access to new course post controller
*/ 
module.exports = newCourse;