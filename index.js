/*
    define global variables
*/
global.LoggedIn = false;  
global.Username = '';  
global.Admin = '';  

/*
    define variables
*/
const adminEmail = 'mouhameddiouf093@gmail.com'; 

/*
    module references
*/ 

// libraries or packages
require('dotenv').config();
const schedule = require('node-schedule'); // to schedule a job or task in the background
const nodeMailer = require('nodemailer')
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash'); // flash is a middleware to temporary store messages and remove it after displayed

// user model
const UserModel = require('./models/users/User');

//controllers 
const logoutUserController = require('./controllers/getting/users/logoutUser');
const renderBlogPostController = require('./controllers/rendering/blog/post');
const getVerifyEmailController = require('./controllers/getting/users/verifyEmail');
const getUserLoginController = require('./controllers/getting/users/userLogin');
const storeUserController = require('./controllers/storing/users/user');
const storePostController = require('./controllers/storing/blog/post');
const storeCourseController = require('./controllers/storing/courses/course');
const storeProjectController = require('./controllers/storing/projects/project');
const storeBlogPostCommentController = require('./controllers/storing/blog/comment');
const storeCoursesPostCommentController = require('./controllers/storing/courses/comment');
const storeProjectsPostCommentController = require('./controllers/storing/projects/comment');
const storeUserMailController = require('./controllers/storing/users/mailMe');
const renderNotFoundController = require('./controllers/rendering/404/notFound');
const renderHomeController = require('./controllers/rendering/home/home');
const renderContactController = require('./controllers/rendering/users/contactezMoi');
const renderAuthLoginController = require('./controllers/rendering/users/authLogin');
const renderAuthRegisterController = require('./controllers/rendering/users/newUser');
const renderNewPostController = require('./controllers/rendering/blog/newPost');
const renderNewCourseController = require('./controllers/rendering/courses/newCourse');
const renderCoursesController = require('./controllers/rendering/courses/courses');
const renderUserAccountController = require('./controllers/rendering/users/user');
const renderSearchedCoursesPostController = require('./controllers/rendering/courses/search');
const renderSearchedBlogPostController = require('./controllers/rendering/home/search');
const renderSearchedProjectsPostController = require('./controllers/rendering/projects/search');
const renderProjectsController = require('./controllers/rendering/projects/projects');
const renderUser2mdController = require('./controllers/rendering/users/user2md');
const renderNewProjectController = require('./controllers/rendering/projects/newProject');
const renderCourseController = require('./controllers/rendering/courses/course');
const renderProjectController = require('./controllers/rendering/projects/project');
const renderRequestedUserController = require('./controllers/rendering/users/requestedUser');
const deleteBlogPostController = require('./controllers/deleting/blog/post');
const deleteProjectsPostController = require('./controllers/deleting/projects/post');
const deleteCoursesPostController = require('./controllers/deleting/courses/post');
const deleteBlogPostCommentController = require('./controllers/deleting/blog/comment');
const deleteCoursePostCommentController = require('./controllers/deleting/courses/comment');
const deleteProjectPostCommentController = require('./controllers/deleting/projects/comment');
const updateBlogPostController = require('./controllers/updating/blog/post');
const updateCoursesPostController = require('./controllers/updating/courses/post');
const updateProjectsPostController = require('./controllers/updating/projects/post');
const updateBlogPostCommentController = require('./controllers/updating/blog/comment');
const updateCoursesPostCommentController = require('./controllers/updating/courses/comment');
const updateProjectsPostCommentController = require('./controllers/updating/projects/comment');
const saveUpdatedCoursesPostController = require('./controllers/updating/courses/save');
const saveUpdatedBlogPostController = require('./controllers/updating/blog/save');
const saveUpdatedProjectsPostController = require('./controllers/updating/projects/save');
    
//custom middlewares 
const verifyIsLogOutMiddleware = require('./middlewares/verify/isLogOut'); 
const verifyIsLogInMiddleware = require('./middlewares/verify/isLogIn');
const verifyUserAccountMiddleware = require('./middlewares/verify/account');
const sanitizeSignInMiddleware = require('./middlewares/sanitize/users/signIn');
const sanitizeSignUpMiddleware = require('./middlewares/sanitize/users/signUp');
const sanitizeBlogpostMiddleware = require('./middlewares/sanitize/blog/post');
const sanitizeUpdatedPostMiddleware = require('./middlewares/sanitize/blog/updatedPost');
const sanitizeUsersNewCommentInputMiddleware = require('./middlewares/sanitize/blog/newPostComment');
const sanitizeCoursesNewPostMiddleware = require('./middlewares/sanitize/courses/newPost');
const sanitizeCoursesUpdatedPostMiddleware = require('./middlewares/sanitize/courses/updatedPost');
const sanitizeCoursesNewPostCommentMiddleware = require('./middlewares/sanitize/courses/newPostComment');

    
// utils 
const deleteUnverifiedUserUtils = require('./utils/delete/users/unverified');

/*
    server
*/
const app = new express();

/*
    connect to my mongo databasse server
*/
mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb://localhost:27017/2mdBlog', 
    {useNewUrlParser: true},
    (e) => {
        if(e){
            console.error(e);
        }else{
            console.log('Connected to MongoDB');
        }
    }
)

/*
    port
*/
let port = process.env.PORT || 4000;
app.listen(port, () => {console.log('Express server listening on port 4000')});

/*
    provide the static files
*/
app.use(express.static('public')); 

/*
    set a view engine(ejs)
*/ 
app.set('view engine', 'ejs');

/*
    middlewares
*/
// middleware body-parser.json() and body-parser.urlencoded() parse the req.body to make available form datas 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// middleware express-fileupload upload the files into the req.file object
app.use(expressFileUpload());
// middleware express-session use the req.session object to save the session ID into browser's cookies then sign the user and encrypt its sessionID to keep the user log in
app.use(expressSession({secret: 'keyboard cat'}));  
// custom middleware allow the front-end to know whether the user has a session or not 
app.use(
    '*',
    async (req, res, next) => {
        loggedIn = req.session.userId;
        if(loggedIn)
        {
            try
            {
                const user = await UserModel.findById(req.session.userId);
                if(user)
                {
                    Username = user.username;
                    const userEmail = user.email;
                    if(Object.is(adminEmail,userEmail))
                    {
                        Admin = true;
                    }
                    else 
                    {
                        Admin = false
                    }
                }
            }
            catch(err)
            {
                console.error(err);
            }
        }
        next();
    }
)
//middleware flash 
app.use(flash());

/*
    handle get request
*/ 
app.get('/', renderHomeController);
app.get('/404', renderNotFoundController);
app.get('/search/blog', renderSearchedBlogPostController);
app.get('/contacte', renderContactController);
app.get('/auth/login', renderAuthLoginController);
app.get('/auth/register',verifyIsLogOutMiddleware, renderAuthRegisterController);
app.get('/users/auth/register',verifyIsLogOutMiddleware, renderAuthRegisterController);
app.get('/verify/:token', getVerifyEmailController);
app.get('/users/account',verifyIsLogInMiddleware, renderUserAccountController);
app.get('/users/logout',verifyIsLogInMiddleware, logoutUserController);
app.get('/users/2md', renderUser2mdController);
app.get('/users/:user', renderRequestedUserController);
app.get('/projets', renderProjectsController);
app.get('/projets/new', renderNewProjectController);
app.get('/projets/:id', renderProjectController);
app.get('/search/projets/:id', renderProjectController);
app.get('/projects/:id/delete', deleteProjectsPostController) 
app.get('/projects/:id/update', updateProjectsPostController)
app.get('/projects/:projectId/:commentId', deleteProjectPostCommentController)
app.get('/search/projects', renderSearchedProjectsPostController);
app.get('/posts/new',verifyIsLogInMiddleware, renderNewPostController);
app.get('/posts/:id', renderBlogPostController);
app.get('/search/posts/:id', renderBlogPostController);
app.get('/posts/:id/delete', deleteBlogPostController)  
app.get('/posts/:id/update', updateBlogPostController)
app.get('/posts/:postId/:commentId', deleteBlogPostCommentController)
app.get('/courses', renderCoursesController);
app.get('/courses/new', renderNewCourseController);
app.get('/courses/:id', renderCourseController);
app.get('/search/courses/:id', renderCourseController);
app.get('/courses/:id/delete', deleteCoursesPostController) 
app.get('/courses/:id/update', updateCoursesPostController)
app.get('/courses/:courseId/:commentId', deleteCoursePostCommentController)
app.get('/search/courses', renderSearchedCoursesPostController);
/*
    handle post request
*/
app.post('/users/new', sanitizeSignUpMiddleware , storeUserController); 
app.post('/users/login', sanitizeSignInMiddleware, getUserLoginController); 
app.post('/posts/store',  verifyIsLogInMiddleware, verifyUserAccountMiddleware, sanitizeBlogpostMiddleware, storePostController);
app.post('/posts/:id/save', verifyIsLogInMiddleware, verifyUserAccountMiddleware, sanitizeUpdatedPostMiddleware, saveUpdatedBlogPostController);
app.post('/posts/:id/comments/new', verifyIsLogInMiddleware, verifyUserAccountMiddleware, sanitizeUsersNewCommentInputMiddleware, storeBlogPostCommentController);
app.post('/posts/:postId/:commentId/save', verifyUserAccountMiddleware, sanitizeUsersNewCommentInputMiddleware, updateBlogPostCommentController);
app.post('/courses/store',  verifyIsLogInMiddleware, sanitizeCoursesNewPostMiddleware, storeCourseController);
app.post('/courses/:id/save',verifyIsLogInMiddleware, sanitizeCoursesUpdatedPostMiddleware, saveUpdatedCoursesPostController);
app.post('/courses/:id/comments/new',verifyIsLogInMiddleware, sanitizeCoursesNewPostCommentMiddleware, storeCoursesPostCommentController);
app.post('/courses/:courseId/:commentId/save', verifyIsLogInMiddleware, sanitizeCoursesNewPostCommentMiddleware, updateCoursesPostCommentController);
app.post('/projets/store', storeProjectController);
app.post('/projects/:id/comments/new', verifyIsLogInMiddleware, storeProjectsPostCommentController);
app.post('/projects/:id/save', saveUpdatedProjectsPostController);
app.post('/projects/:projectId/:commentId/save', updateProjectsPostCommentController);
app.post('/contact',verifyIsLogInMiddleware, storeUserMailController);
/*
    background tast
*/
schedule.scheduleJob('0 * * * *', deleteUnverifiedUserUtils); 
/*
    Handle not found request
*/
app.use((req, res, next) => {res.render('404/notFound')}) 

