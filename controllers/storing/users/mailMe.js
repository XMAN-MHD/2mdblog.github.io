/*
   module references 
*/
require('dotenv').config() // have access to the variables in the file .env
const nodemailer = require("nodemailer"); // nodemailer allow us to send and receive mail for our app
const UserModel = require('../../../models/users/User');
/*
    controller
*/ 
const contactMe = (req, res) => {
  // get the data sent by the user 
  const {subject, name, email, phone, message} = req.body;
  // create a transporter to transport the mail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: 
    {
      user: process.env.GMAIL_BLOG,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  // send the mail using the method sendMail() of the transporter
  transporter.sendMail(
    {
      from: '"2mdBlog"' + process.env.GMAIL_BLOG,
      to: process.env.GMAIL_ADMIN,
      subject: "A user send you a mail",
      html: `<div>
        <p>
          <span style="font-weight: bold;">Subject :</span>
          ${subject}
        </p>
        <p>
          <span style="font-weight: bold;">Name :</span>
          ${name}
        </p>
        <p>
          <span style="font-weight: bold;">Email :</span>
          ${email}
        </p>
        <p>
          <span style="font-weight: bold;">Phone :</span>
          ${phone}
        </p>
        <p>
          ${message}
        </p>
      </div>`
    }, 
    (err, info) => {
      if (err) 
      {
        console.error(err);
        return res.render('users/contactezMoi');  
      } 
      else 
      {
        console.log(`Email sent: ${info.response}`);
        return res.render('users/contactezMoi');  
      }
    }
  );
}
/*
    give access to store user controller
*/ 
module.exports = contactMe;