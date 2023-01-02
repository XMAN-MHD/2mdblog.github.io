/*
    controller
*/ 
const renderUser2md = (req, res) => {
    res.render(
        'users/user2md', 
    );
}
/*
    give access to renderUser2md controller
*/ 
module.exports = renderUser2md;