/*
   module references 
*/
const path = require('path'); 
const nodemailer = require('nodemailer');
const UserModel = require('../../../models/users/User');
const jwt = require('jsonwebtoken');
/*
    controller
*/ 
const storeUser = async (req, res) => {
try {
    let newUser ='';
    // Create a verification token
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    // create transporter and mailOptions
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_BLOG,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: `"2MDBLOG" ${process.env.GMAIL_BLOG}`, // sender address
        to: req.body.email, // list of receivers
        subject: 'Email verification', // Subject line
        html: `<div>
            <p>Bonjour <b style="text-transform:capitalize">${req.body.name}</b></p>
            <p>Cliquez sur le lien ci-dessous pour confirmer la création de votre compte.</p>
            <p><a href="http://localhost:4000/verify/${token}">cliquer sur ce lien pour créer votre compte</p>
        </div>`
    };
    // create an image uploaded handler. it will get the image and can perform treatments on it.
    let imageHandler = req.files.image;
    // create a new user with the data sent from the visitor
    imageHandler.mv(
        path.resolve(__dirname, '../../../public/assets/img/', imageHandler.name) //move the image to the public folder and rename it 
    ); 
    newUser = new UserModel(
        {...req.body, profileImage: '/assets/img/' + imageHandler.name, token:token}
    )
    // Save the user to the database and if successfull send the email verification
    await newUser.save(
        (err,user) => {
          if(err)
          {
            res.status(400).sendFile(path.resolve(__dirname, '../../../public/html/users/newUserFailed.html'));
          }
          else 
          {
            console.log( `new user: ${user._id}`);
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('error sending the mail' + error);
                return res.status(400).sendFile(path.resolve(__dirname, '../../../public/html/users/mailingFailed.html'))
              }
              console.log('Verification email sent to: %s', info.messageId);
              res.status(200).sendFile(path.resolve(__dirname, '../../../public/html/users/linkSentSuccessfully.html'))
            });
          }
        }
    );
}
catch (err){
    console.error(err.message);
}
}
/*
    give access to store user controller
*/ 
module.exports = storeUser;