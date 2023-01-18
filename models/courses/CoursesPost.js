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
    comments: [ { authorId: mongoose.Schema.Types.ObjectId, author: String, body: String, dateOfComment:{ type: Date, default: new Date() } } ],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true}, 
    postDate: { type: Date, default: new Date() }
})
// create indexes to search for posts using queries and not using IDs   
// indexes tell mongoose to search for documents  using the specied field's values and work together with operators 
CoursesPostSchema.index(
    { title: 'text' }
);
/*
    post model(collection)
*/ 
const CoursesPostModel = mongoose.model('coursesposts', CoursesPostSchema);
/*
    give access to the user model
*/
module.exports = CoursesPostModel;   


