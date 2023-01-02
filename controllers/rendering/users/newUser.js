/*
    controller
*/ 
const newUser = (req, res) => {
    res.render(
        'users/inscription', 
        {editor: true}
    );
}
/*
    give access to index controller
*/ 
module.exports = newUser;