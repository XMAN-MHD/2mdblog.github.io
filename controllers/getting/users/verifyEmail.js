/*
    module references
*/ 
    // packages or libraries
const jwt = require('jsonwebtoken');
const path = require('path'); 
    // models
const User = require('../../../models/users/User');
/*
    controller
*/ 
const verifyEmail = (req, res) => {
    try 
    {
      /* Verify the token: 
        if the token already signed is verified this will decode the token and make available the email payload
        else the verification failed and the email payload can not be retrieve
      */
      const decodedToken = jwt.verify(req.params.token, process.env.SECRET_KEY);

      /* Update the user's information : 
        if the user is successfully updated it means the email has been verified
        else the user is unsuccessfully updated it means the email has not been verified
      */ 
      User.findOneAndUpdate(
        { email: decodedToken.email }, 
        { isVerified: true },
        (err,user) => {
          if (!err && user) 
          {
            return res.status(400).sendFile(path.resolve(__dirname, '../../../public/html/users/emailVerified.html'))
          } 
          else 
          {
            return res.status(400).sendFile(path.resolve(__dirname, '../../../public/html/users/newUserFailed.html'))
          }
        }
      );
    } 
    catch (err) 
    {
      console.log(err.message);
    }    
    
}
/*
    give access to verify email controller
*/ 
module.exports = verifyEmail;