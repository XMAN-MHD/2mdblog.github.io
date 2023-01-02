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
const homeController = require('./controllers/rendering/home/home');
const contactezMoiController = require('./controllers/rendering/users/contactezMoi');
const authLoginController = require('./controllers/rendering/users/authLogin');
const newUserController = require('./controllers/rendering/users/newUser');
const newPostController = require('./controllers/rendering/blog/newPost');
const renderNewProjectController = require('./controllers/rendering/projects/newProject');
const newCourseController = require('./controllers/rendering/courses/newCourse');
const coursesController = require('./controllers/rendering/courses/courses');
const renderProjectsController = require('./controllers/rendering/projects/projects');
const userController = require('./controllers/rendering/users/user');
const storeUserController = require('./controllers/storing/users/user');
const userLoginController = require('./controllers/logics/users/userLogin');
const renderUser2mdController = require('./controllers/rendering/users/user2md');
const logoutUserController = require('./controllers/logics/users/logoutUser');
const storePostController = require('./controllers/storing/blog/post');
const storeCourseController = require('./controllers/storing/courses/course');
const storeProjectController = require('./controllers/storing/projects/project');
const getPostController = require('./controllers/rendering/blog/post');
const renderCourseController = require('./controllers/rendering/courses/course');
const renderProjectController = require('./controllers/rendering/projects/project');
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
    // custum middleware to prevent visitors to connect, to publish and to log out 
app.use('/posts/new', keepVisitorsOutMiddleware);
app.use('/users/logout', keepVisitorsOutMiddleware);
app.use('/users/account', keepVisitorsOutMiddleware);
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
/*
    handle get request
*/ 
app.get('/', homeController);
app.get('/contacte', contactezMoiController);
app.get('/auth/login', authLoginController);
app.get('/auth/register', newUserController);
app.get('/courses/new', newCourseController);
app.get('/projets/new', renderNewProjectController);
app.get('/posts/new', newPostController);
app.get('/courses', coursesController);
app.get('/projets', renderProjectsController);
app.get('/users/account', userController);
app.get('/users/logout', logoutUserController);
app.get('/users/2md', renderUser2mdController);
app.get('/posts/:id', getPostController);
app.get('/projets/:id', renderProjectController);
app.get('/courses/:id', renderCourseController);

/*
    handle post request
*/
app.post('/users/new', storeUserController); 
app.post('/users/login', userLoginController); 
app.post('/posts/store', storePostController);
app.post('/courses/store', storeCourseController);
app.post('/projets/store', storeProjectController);


