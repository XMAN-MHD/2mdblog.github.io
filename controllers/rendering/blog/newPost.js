/*
    controller
*/ 
const newPost = (req, res) => {
    res.render(
        'blog/publication', 
        {editor: true}
    );
}
/*
    give access to index controller
*/ 
module.exports = newPost;