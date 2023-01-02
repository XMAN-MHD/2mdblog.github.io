/*
    module references
*/
    //packages
const bcrypt = require('bcrypt'); 
    // models
const User = require('../../../models/users/User'); 
/*
    controller
*/ 
const toLoginUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne(
        {email: email},
        (e, user) => {
            if(user)
            {
                bcrypt.compare(
                    password, // the first argument is always the password from the form
                    user.password, 
                    (e, samePassword) => {
                        if(samePassword)
                        {
                            req.session.userId = user._id;
                            return res.redirect('/users/account');
                        }
                        else
                        {
                            return res.redirect('/auth/login');
                        }
                    }
                )
            }
            else
            {
                res.redirect('/auth/login'); 
            }
        }
    );
}
/*
    give access to user login controller
*/ 
module.exports = toLoginUser;