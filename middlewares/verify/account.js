/*
   module references 
*/
// libraries or packages
const path = require('path');
// models
const UserModel = require('../../models/users/User');

/*
    middleware
*/ 
const  verifyUserAccount = async(req, res, next) => {
    try
    {
        // retrieve the user data
        const user = await UserModel.findById(req.session.userId);
        // check if the user account is verified or not
        if(user)
        {
            if(user.isVerified)
            {
                next();
            }
            else
            {
                // send message reminding user to verify its account.
                res.status(200).sendFile(path.resolve(__dirname, '../../public/html/users/remindAccountVerification.html'))   
            }
        }

    }
    catch(error)
    {
        console.error(error);
        return res.redirect('/404')
    }
}

/*
    give access to verify user middleware
*/ 
module.exports =  verifyUserAccount;