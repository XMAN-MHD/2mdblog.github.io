/*
   module references 
*/
    // package references
const path = require('path');
    // user model
const UserModel = require('../../../models/users/User');
/*
    controller
*/ 
const storeUser = (req, res) => {
    // image uploaded handler
    let imageHandler = req.files.image;
    // validation
    imageHandler.mv(
        path.resolve(__dirname, '../../../public/assets/img/', imageHandler.name), 
        async (e) => {
            if (e) {
                return res.redirect('/auth/regester')
            }
            await UserModel.create(
                {...req.body, profileImage: '/assets/img/' + imageHandler.name},
                (e, user) => {
                    if(e) 
                    {
                        return res.redirect('/auth/register')
                    }
                    else
                    {
                        return res.redirect('/auth/login')
                    } 
                } 
            )
        }
    );       
}
/*
    give access to store user controller
*/ 
module.exports = storeUser;