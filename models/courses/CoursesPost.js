/*
    references to the modules
*/
const mongoose = require('mongoose');
const UserModel = require('../users/User');
/*
    schema of course's posts 
*/
const CoursesPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    postImage: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true}, 
    postDate: { type: Date, default: new Date() }
})
/*
    post model(collection)
*/ 
const CoursesPostModel = mongoose.model('coursesposts', CoursesPostSchema);
/*
    give access to the user model
*/
module.exports = CoursesPostModel;   


