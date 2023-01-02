/*
    middleware
*/ 
const checkEmptyLoginFields = (req, res, next) => {
    if (req.body.password == null || req.body.email == null)
    {
      return res.redirect('/auth/register');
    }
    next();
  }
  /*
      give access to checkEmptyField middleware
  */ 
  module.exports = checkEmptyLoginFields;