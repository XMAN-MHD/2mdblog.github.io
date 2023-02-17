/*
    controller
*/ 
const newCourse = (req, res) => {
     // retrieve the errors from flash library
     let errors = req.flash('validationErrors');
     if(errors !== undefined) 
     {
         console.log('validation errors: ' + errors)
     }
    res.render(
        'courses/newcourse', 
        {editor: true, errors:errors}
    );
}
/*
    give access to new course post controller
*/ 
module.exports = newCourse;