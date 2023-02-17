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
            <p>Cliquez sur le lien ci-dessous pour l'activation de votre compte.</p>
            <p><a href="http://localhost:4000/verify/${token}">cliquer sur ce lien pour activer le compte</p>
        </div>`
    };

    /** 
     * send the verification link to the new user.
     * if succesfull create the new user.
    */
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) 
        {
          console.error('error sending the mail : ' + error);
          return res.status(400).sendFile(path.resolve(__dirname, '../../../public/html/users/mailingFailed.html'))
        }
        else
        {
            console.log('Verification email sent to: %s', info.messageId);
            /** 
             * get the image uploaded. 
             * the image comes with properties and mv() method to perform some treatments on it.
            */
            let image = req.files.image;
            //move the image (mv method) to the public folder and rename (image.name) it 
            image.mv(
                path.resolve(__dirname, '../../../public/assets/img/', image.name), 
                (err) => {
                    if(err)
                    {
                        // create the error message with flash 
                        req.flash('validationErrors', "Image non enregistré ou invalide.");
                        //redirect
                        return res.redirect('auth/register');
                    }
                }
            ); 
            // create the user
            UserModel.create(
                {...req.body, profileImage: '/assets/img/' + image.name, token:token},
                (error,user) => {
                    if(error)
                    {
                      console.error('new user can not be created : ' + error.message);
                      // create the error message with flash 
                      req.flash('validationErrors', `Echec de la création du compte. Les données fournies ne sont pas valides ou existent déjà.`);
                      //redirect
                      return res.redirect('auth/register');
                    }
                }
            )

            // compte created successfullly activate it with the link sent.
            res.status(200).sendFile(path.resolve(__dirname, '../../../public/html/users/linkSentSuccessfully.html'))
        }
       
    });

}
catch (error){
    console.error(error.message);
    res.redirect('/404')
}
}
/*
    give access to store user controller
*/ 
module.exports = storeUser;