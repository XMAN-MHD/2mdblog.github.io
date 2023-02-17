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
    minLength: 10
  };

  try {

  /* 1- input vallidation */
    
    // check the email address
    if(typeof req.body.email !== 'undefined') 
    {
      if(!(emailRules.minLength <= req.body.email.length) || !(req.body.email.length <= emailRules.maxLength))  
      {
        if(emailRules.minLength > req.body.email.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', "Email requis ou non valide.");
          // redirect
          return res.redirect('auth/login');
        }
        else if(emailRules.maxLength < req.body.email.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', "Email non valide.");
          // redirect
          return res.redirect('auth/login');
        }
        
      } 
      else if(!(emailRules.allowedChars.test(req.body.email))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Email non valide.");
        // redirect
        return res.redirect('auth/login');
      }
    }

    // check the password
    if(typeof req.body.password !== 'undefined') 
    {
      if(!(passwordRules.minLength <= req.body.password.length) )  
      {
        if(passwordRules.minLength > req.body.password.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', "Mot de passe requis ou trop court, au moins 8 caractères.");
          // redirect
          return res.redirect('auth/login');
        }
        else if(passwordRules.maxLength < req.body.password.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', "Mot de passe trop long, au plus 40 caractères.");
          //redirect
          return res.redirect('auth/login');
        }
        
      } 
      else if(!(passwordRules.allowedChars.test(req.body.password))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Mot de passe non valide, au moins un majuscule, un minuscule et un nombre.");
        //redirect
        return res.redirect('auth/login');
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

    // check email input 
    if(typeof req.body.email !== 'undefined')
    {
      req.body.email = secureHtmlEncode(req.body.email);
    }

    // check password input 
    if(typeof req.body.password !== 'undefined')
    {
      req.body.password = secureHtmlEncode(req.body.password);
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