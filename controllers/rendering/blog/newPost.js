/*
    controller
*/ 
const newPost = (req, res) => {
    // retrieve the errors from flash library
    let errors = req.flash('validationErrors');
    if(errors !== undefined) 
    {
        console.log('validation errors: ' + errors)
    }
    
    res.render(
        'blog/publication', 
        {editor: true,  errors: errors}
    );
}
/*
    give access to index controller
*/ 
module.exports = newPost;