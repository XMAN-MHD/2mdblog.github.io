/*
    controller
*/ 
const authLogin = (req, res) => {
    res.render('users/connexion');
}
/*
    give access to authentification login controller
*/ 
module.exports = authLogin;