/*
    middleware
*/ 
const  keepVisitorsOut = (req, res, next) => {
    if(!req.session.userId)
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
module.exports =  keepVisitorsOut;