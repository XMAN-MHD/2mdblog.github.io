/*
    middleware
*/ 
const keepUsersOut = (req, res, next) => {
    if(req.session.userId)
    {
        res.redirect('/');
    }
    else
    {
        next();
    }
}
/*
    give access to checkEmptyField middleware
*/ 
module.exports = keepUsersOut;