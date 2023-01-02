/*
    references to the modules
*/
const mongoose = require('mongoose');
const UserModel = require('../users/User');
/*
    schema of user model
*/
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    postImage: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true}, 
    postDate: { type: Date, default: new Date() }
})
/*
    user model
*/ 
const Post = mongoose.model('posts', PostSchema);
/*
    give access to the user model
*/
module.exports = Post;   


