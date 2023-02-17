/*
    controller
*/ 
const authLogin = (req, res) => {
    let errors = req.flash('validationErrors');
    if(errors !== undefined) 
    {
        console.log('validation errors: ' + errors)
    }
    res.render(
        'users/connexion',
        {
            errors: errors
        }
    );
}
/*
    give access to authentification login controller
*/ 
module.exports = authLogin;