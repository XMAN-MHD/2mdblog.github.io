/*
    controller
*/ 
const logoutUser = (req, res) => {
    if(req.session.userId)
    {
        req.session.destroy(
            () => {
                res.redirect('/');
            }
        );
    }
    else 
    {
        res.redirect('/');
    }
}
/*
    give access to logout user controller
*/ 
module.exports = logoutUser;