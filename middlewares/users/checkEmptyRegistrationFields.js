/*
    middleware
*/ 
const checkEmptyRegistrationFields = (req, res, next) => {
  if (req.files == null || req.body.name == null || req.body.username == null || req.body.password == null || req.body.email == null || req.body.phone == null || req.body.message == null )
  {
    return res.redirect('/auth/register');
  }
  next();
}
/*
    give access to checkEmptyField middleware
*/ 
module.exports = checkEmptyRegistrationFields;