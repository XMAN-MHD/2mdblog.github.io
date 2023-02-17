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
    minLength: 500
  };

  // Define the validation rules for title field
  const titleRules = {
    minLength: 6, 
    maxLength: 60,
    allowedChars: /^[a-zA-Z0-9!@#$%^&*()\-,.?":| ]+$/ //This regex allows for any combination of upper and lowercase letters, as well as spaces.
  };

  try {

  /* 1- input vallidation */
    
    // check title input
    if(typeof req.body.title !== 'undefined') 
    {
      if(!(titleRules.minLength <= req.body.title.length) || !(req.body.title.length <= titleRules.maxLength))  
      {
        if(titleRules.minLength > req.body.title.length) 
        {
          // create the error message with flash 
          req.flash('validationErrors', 'Titre requis ou trop courts au moins 6 caractères.');
          // redirect
          return res.redirect(`/posts/${req.params.id}/update`);
        }
        else if(titleRules.maxLength < req.body.title.length)
        {
          // create the error message with flash 
          req.flash('validationErrors', 'Titre trop longs au moins 60 caractères.');
          // redirect
          return res.redirect(`/posts/${req.params.id}/update`);
        }
      } 
      if(!(titleRules.allowedChars.test(req.body.title))) 
      {
        // create the error message with flash 
        req.flash('validationErrors', 'Titre invalide | les lettres, nombres, caractéres spéciaux sont autorisées.');
        // redirect
        return res.redirect(`/posts/${req.params.id}/update`);
      }
    }

    // check the message
    if(typeof req.body.message !== 'undefined') 
    {
      if(!(messageRules.minLength <= req.body.message.length))  
      {
        // create the error message with flash 
        req.flash('validationErrors', "Message requis ou trop court 500 charactères minimum.");
        //redirect
        return res.redirect(`/posts/${req.params.id}/update`);
      } 
    }


    /* 2- uploads validation */

    // check image upload
    if(req.files == undefined)
    {
      // create the error message with flash 
      req.flash('validationErrors', "téléchargement image requis.");
      //redirect
      return res.redirect(`/posts/${req.params.id}/update`);
    }
    else 
    {
      // Validate the image file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(req.files.image.mimetype)) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Type de fichier non valide | formats JPEG, PNG et GIF sont autorisés.");
        //redirect
        return res.redirect(`/posts/${req.params.id}/update`);
      }

      // Validate the image file size
      const twoMB = 2 * 1024 * 1024;
      if(req.files.image.size > twoMB) 
      {
        // create the error message with flash 
        req.flash('validationErrors', "Taille de fichier autorisée au maximum 2 Mo.");
        //redirect
        return res.redirect(`/posts/${req.params.id}/update`);
      }
    }


  /* 3- sanitizing */

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

    // check title input 
    if(typeof req.body.title !== 'undefined')
    {
      req.body.title = secureHtmlEncode(req.body.title);
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