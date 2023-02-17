/*
    references to the modules
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
/*
    schema of user model
*/
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    phone: { type: Number, required: true, unique: true },
    message: { type: String, required: true },
    profileImage: { type: String, required: true },
    token: { type: String },
    isVerified: { type: Boolean, default: false }, 
    createAt: { type: Date, default: Date.now() }
})
/*
    use the plugin mongoose unique validator to handle fields with unique value
*/ 
UserSchema.plugin(uniqueValidator);
/*
    hash the password before to save the data
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


