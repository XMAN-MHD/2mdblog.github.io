/*
    controller
*/ 
const newUser = (req, res) => {
    let errors = req.flash('validationErrors');
    if(errors !== undefined) 
    {
        console.log('validation errors: ' + errors)
    }
    res.render(
        'users/inscription', 
        {
            editor: true,
            errors: errors
        }
    );
}
/*
    give access to index controller
*/ 
module.exports = newUser;