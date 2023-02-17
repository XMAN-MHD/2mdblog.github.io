/*
    controller
*/ 
const notFound = (req, res) => {
    res.render(
        '404/notFound', 
    );
}
/*
    give access to controller
*/ 
module.exports = notFound;