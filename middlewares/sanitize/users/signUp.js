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
    allowedChars: /^[a-zA-Z0-9 !@#$%^&*()_+-]+$/  // the regex is a pattern used to match a string consisting of letters (uppercase or lowercase), numbers, and specific special characters.
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
    minLength: 50
  };

  try {

  /* 1- input vallidation */

    // check the name
    if(typeof req.body.name !== 'undefined') 
    {
      if(!(nameRules.minLength <= req.body.name.length) || !(req.body.name.length <= nameRules.maxLength))  
      {
        if(nameRules.minLength > req.body.name.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', 'Prénom et nom requis ou trop courts au moins 3 caractères.');
          // redirect
          return res.redirect('auth/register');
        }
        else if(nameRules.maxLength < req.body.name.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', 'Prénom et nom trop longs au plus 40 caractères.');
          // redirect
          return res.redirect('auth/register');
        }
      } 
      else if(!(nameRules.allowedChars.test(req.body.name))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', 'Prénom et nom invalides | lettres autorisées.');
        // redirect
        return res.redirect('auth/register');
      }
    }
    // check the username
    if(typeof req.body.username !== 'undefined') 
    {
      if(!(usernameRules.minLength <= req.body.username.length) || !(req.body.username.length <= usernameRules.maxLength))  
      {
        if(usernameRules.minLength > req.body.username.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', "Nom d'utilisateur requis ou trop court au moins 3 caractères.");
          // redirect
          return res.redirect('auth/register');
        }
        else if(usernameRules.maxLength < req.body.username.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', "Nom d'utilisateur trop long au plus 40 caractères.");
          // redirect
          return res.redirect('auth/register');
        }
        
      } 
      else if(!(usernameRules.allowedChars.test(req.body.username))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Nom d'utilisateur invalide | lettres, nombres, caractères spécials autorisés.");
        // redirect 
        return res.redirect('auth/register');
      }
    }

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
          return res.redirect('auth/register');
        }
        else if(emailRules.maxLength < req.body.email.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', "Email non valide.");
          // redirect
          return res.redirect('auth/register');
        }
        
      } 
      else if(!(emailRules.allowedChars.test(req.body.email))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Email non valide.");
        // redirect
        return res.redirect('auth/register');
      }
    }

    // check the password
    if(typeof req.body.password !== 'undefined') 
    {
      if(!(passwordRules.minLength <= req.body.password.length) || !(req.body.password.length <= passwordRules.maxLength))  
      {
        if(passwordRules.minLength > req.body.password.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', "Mot de passe requis ou trop court au moins 8 caractères.");
          // redirect
          return res.redirect('auth/register');
        }
        else if(passwordRules.maxLength < req.body.password.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', "Mot de passe trop long au plus 40 caractères.");
          //redirect
          return res.redirect('auth/register');
        }
        
      } 
      else if(!(passwordRules.allowedChars.test(req.body.password))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Mot de passe non valide au moins un majuscule, un minuscule et un nombre.");
        //redirect
        return res.redirect('auth/register');
      }
    }

    // check the phone number
    if(typeof req.body.phone !== 'undefined') 
    {
      if(!(phoneRules.length === req.body.phone.length))  
      {
        // create the error message with flash 
        req.flash('validationErrors', "Téléphone requis et composé de 9 chiffres.");
        //redirect
        return res.redirect('auth/register');
      } 
      else if(!(phoneRules.allowedChars.test(req.body.phone))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Téléphone requis et composé de 9 chiffres." );
        //redirect
        return res.redirect('auth/register');
      }
    }

    // check the message
    if(typeof req.body.message !== 'undefined') 
    {
      if(!(messageRules.minLength <= req.body.message.length))  
      {
        // create the error message with flash 
        req.flash('validationErrors', "Message requis ou trop court au moins 50 caractères.");
        //redirect
        return res.redirect('auth/register');
      } 
    }


  /* 2- uploads validation */

    // check image upload
    if(req.files == undefined)
    {
      // create the error message with flash 
      req.flash('validationErrors', "téléchargement image requis.");
      //redirect
      return res.redirect('auth/register');
    }
    else 
    {
      // Validate the image file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(req.files.image.mimetype)) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Type de fichier non valide | formats JPEG, PNG et GIF sont autorisés.");
        //redirect
        return res.redirect('auth/register');
      }

      // Validate the image file size
      const twoMB = 2 * 1024 * 1024;
      if(req.files.image.size > twoMB) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Taille de fichier autorisée au maximum 2 Mo.");
        //redirect
        return res.redirect('auth/register');
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

    // check name input 
    if(typeof req.body.name !== 'undefined')
    {
      req.body.name = secureHtmlEncode(req.body.name);
    }

    // check username input 
    if(typeof req.body.username !== 'undefined')
    {
      req.body.username = secureHtmlEncode(req.body.username);
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
    // check phone input 
    if(typeof req.body.phone !== 'undefined')
    {
      req.body.phone = secureHtmlEncode(req.body.phone);
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