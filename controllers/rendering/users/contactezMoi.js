/*
    controller
*/ 
const contactezMoi = (req, res) => {
    res.render(
        'users/contactezMoi', 
        {editor: true}
    );
}
/*
    give access to index controller
*/ 
module.exports = contactezMoi;