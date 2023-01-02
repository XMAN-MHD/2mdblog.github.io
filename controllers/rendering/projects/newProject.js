/*
    controller
*/ 
const newProject = (req, res) => {
    res.render(
        'projects/newProject', 
        {editor: true}
    );
}
/*
    give access to new project controller
*/ 
module.exports = newProject;