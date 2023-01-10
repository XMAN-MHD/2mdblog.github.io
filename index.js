/*
    define global variables
*/
global.LoggedIn = false;  
global.Username = '';  
/*
    references to modules
*/ 
    // packages
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const expressSession = require('express-session');
    // user model
const UserModel = require('./models/users/User');
    //controllers 
const logoutUserController = require('./controllers/getting/users/logoutUser');
const getPostController = require('./controllers/rendering/blog/post');
const getUserLoginController = require('./controllers/getting/users/userLogin');
const storeUserController = require('./controllers/storing/users/user');
const storePostController = require('./controllers/storing/blog/post');
const storeCourseController = require('./controllers/storing/courses/course');
const storeProjectController = require('./controllers/storing/projects/project');
const storeBlogPostCommentController = require('./controllers/storing/blog/blogPostComment');
const storeCoursesPostCommentController = require('./controllers/storing/courses/coursesPostComment');
const storeProjectsPostCommentController = require('./controllers/storing/projects/projectsPostComment');
const renderHomeController = require('./controllers/rendering/home/home');
const renderContactController = require('./controllers/rendering/users/contactezMoi');
const renderAuthLoginController = require('./controllers/rendering/users/authLogin');
const renderAuthRegisterController = require('./controllers/rendering/users/newUser');
const renderNewPostController = require('./controllers/rendering/blog/newPost');
const renderNewCourseController = require('./controllers/rendering/courses/newCourse');
const renderCoursesController = require('./controllers/rendering/courses/courses');
const renderUserAccountController = require('./controllers/rendering/users/user');
const renderSearchedBlogPostController = require('./controllers/rendering/home/searchBlogPost');
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
const updateBlogPostController = require('./controllers/updating/blog/post');
const updateCoursesPostController = require('./controllers/updating/courses/post');
const updateProjectsPostController = require('./controllers/updating/projects/post');
const updateBlogPostCommentController = require('./controllers/updating/blog/comment');
const saveUpdatedCoursesPostController = require('./controllers/updating/courses/save');
const saveUpdatedBlogPostController = require('./controllers/updating/blog/save');
const saveUpdatedProjectsPostController = require('./controllers/updating/projects/save');
    //custom middlewares 
const checkEmptyRegistrationFieldsMiddleware = require('./middlewares/users/checkEmptyRegistrationFields'); 
const checkEmptyLoginFieldsMiddleware = require('./middlewares/users/checkEmptyLoginFields'); 
const keepUsersOutMiddleware = require('./middlewares/users/keepUsersOut'); 
const keepVisitorsOutMiddleware = require('./middlewares/users/keepVisitorsOut');
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
    // custom middleware checkEmptyFields from user registration and login interface
app.use("/users/new", checkEmptyRegistrationFieldsMiddleware); 
app.use("/users/login", checkEmptyLoginFieldsMiddleware);
    // middleware express-session use the req.session object to save the session ID into browser's cookies then sign the user and encrypt its sessionID to keep the user log in
app.use(expressSession({secret: 'keyboard cat'}));  
    // custum middleware to prevent an authentificated use to log in or to register 
app.use('/auth/register', keepUsersOutMiddleware);   
// custom middleware allow the front-end to know whether the user has a session or not 
app.use(
    '*',
    (req, res, next) => {
        loggedIn = req.session.userId;
        if(loggedIn)
        {
            UserModel.findById(
                req.session.userId,
                (e, user) => {
                    if(!e)
                    {
                        Username = user.username;
                    }
                } 
            );
        }
        next();
    }
)  
    // custum middleware to prevent visitors to connect, to publish, to comment and to log out 
app.use('/posts/new', keepVisitorsOutMiddleware);
app.use('/users/logout', keepVisitorsOutMiddleware);
app.use('/users/account', keepVisitorsOutMiddleware);
app.use('/posts/:id/comments/new', keepVisitorsOutMiddleware);

/*
    handle get request
*/ 
app.get('/', renderHomeController);
app.get('/search', renderSearchedBlogPostController);
app.get('/contacte', renderContactController);
app.get('/auth/login', renderAuthLoginController);
app.get('/auth/register', renderAuthRegisterController);
app.get('/users/account', renderUserAccountController);
app.get('/users/logout', logoutUserController);
app.get('/users/2md', renderUser2mdController);
app.get('/users/:user', renderRequestedUserController);
app.get('/projets', renderProjectsController);
app.get('/projets/new', renderNewProjectController);
app.get('/projets/:id', renderProjectController);
app.get('/projects/:id/delete', deleteProjectsPostController) 
app.get('/projects/:id/update', updateProjectsPostController)
app.get('/posts/new', renderNewPostController);
app.get('/posts/:id', getPostController);
app.get('/posts/:id/delete', deleteBlogPostController)  
app.get('/posts/:id/update', updateBlogPostController)
app.get('/posts/:postId/:commentId', deleteBlogPostCommentController)
app.get('/courses', renderCoursesController);
app.get('/courses/new', renderNewCourseController);
app.get('/courses/:id', renderCourseController);
app.get('/courses/:id/delete', deleteCoursesPostController) 
app.get('/courses/:id/update', updateCoursesPostController)
/*
    handle post request
*/
app.post('/users/new', storeUserController); 
app.post('/users/login', getUserLoginController); 
app.post('/posts/store', storePostController);
app.post('/posts/:id/save', saveUpdatedBlogPostController);
app.post('/posts/:id/comments/new', storeBlogPostCommentController);
app.post('/posts/:postId/:commentId/save', updateBlogPostCommentController);
app.post('/courses/store', storeCourseController);
app.post('/courses/:id/comments/new', storeCoursesPostCommentController);
app.post('/courses/:id/save', saveUpdatedCoursesPostController);
app.post('/projets/store', storeProjectController);
app.post('/projects/:id/comments/new', storeProjectsPostCommentController);
app.post('/projects/:id/save', saveUpdatedProjectsPostController);
/*
    Handle not found request
*/
app.use((req, res, next) => {res.render('404/notFound')}) 

