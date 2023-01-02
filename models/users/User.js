/*
    references to the modules
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/*
    schema of user model
*/
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    message: { type: String, required: true },
    profileImage: { type: String, required: true }
})
/*
    hash the password before to save it
*/ 
UserSchema.pre(
    'save', 
    function(next){
        const user = this;
        bcrypt.hash(
            user.password, 
            10, 
            function(err, hash)
            {
                user.password = hash;
                next();
            }
        )
    }
)
/*
    user model
*/ 
const User = mongoose.model('users', UserSchema);
/*
    give access to the user model
*/
module.exports = User;   


