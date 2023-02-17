/*
  library, package, modules references
*/
const path = require('path');

/*
  controller
*/
const sanitize = async(req, res, next) => {

  // Define the validation rules for the name field
  const nameRules = {
    minLength: 3,
    maxLength: 40,
    allowedChars: /^[a-zA-Z\s]+$/ //This regex allows for any combination of upper and lowercase letters, as well as spaces.
  };
  
  // Define the validation rules for the username field
  const usernameRules = {
    minLength: 3,
    maxLength: 40,
    allowedChars: /^[a-zA-Z0-9 !@#$%^&*()_+-]+$/
  }

  // Define the validation rules for the email field
  const emailRules = {
    minLength: 5,
    maxLength: 100,
    allowedChars: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // this regex will validate correct email addresses
  };
  
  // Define the validation rules for the password field
  const passwordRules = {
    minLength: 8,
    maxLength: 40,
    allowedChars:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // This regex requires the password to contain at least one uppercase, one lowercase and one number.
  }; 
  
  // Define the validation rules for phone field
  const phoneRules = {
    length: 9,
    allowedChars:  /^[0-9]{9}$/ // This regex will validate a phone number in Senegal of 9 numeric characters
  };

  // Define the validation rules for message field
  const messageRules = {
    minLength: 10,
  };

  // Define the validation rules for the new comment field   
  const newCommentRules = {
    minLength: 5, 
    maxLength: 500,
  };
  try {

  /* 1- input vallidation */
    
    // check the comment
    if(typeof req.body.body !== 'undefined') 
    {
      if(!(newCommentRules.minLength <= req.body.body.length) || !(req.body.body.length <= newCommentRules.maxLength))  
      {
        if(!(newCommentRules.minLength <= req.body.body.length))
        {
            // create the error message with flash 
            req.flash('commentsValidationErrors', "Commentaire requis ou trop court 5 caractères au minimum.");
            // redirect
            return res.redirect(`/posts/${req.params.id}`);
        }
        else if(!(req.body.body.length <= newCommentRules.maxLength))
        {
            // create the error message with flash 
            req.flash('commentsValidationErrors', "Commentaire trop long 500 charactères maximum.");
            // redirect
            return res.redirect(`/posts/${req.params.id}`);
        }
      } 
    }

  /* 2- xss validation */

    // create a function to check for XSS
    function secureHtmlEncode(input) 
    {
      // remove the leading and trailing spaces 
      const str = input.trim(); 

      // replace the unsecured characters
      return str.replace(/[&<>"'`=\/]/g, function (c) {
        return `&#x${c.charCodeAt(0).toString(16)};`;
      });
    }

    // check new comment input 
    if(typeof req.body.body !== 'undefined')
    {
      req.body.body = secureHtmlEncode(req.body.body);
    }

  // if the form data passed the checking server takes over
    next();
  }
  catch(err)
  {
    console.log(err);
    res.redirect('/404');
  }
}

/*
  give access to the controller
*/ 
module.exports = sanitize;