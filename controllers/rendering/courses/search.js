const CoursesBlogPostModel = require('../../../models/courses/CoursesPost');

const search = async (req, res) => {
  // check if we ara searching
  let searching = true;
  // get the queries form the search bar
  const searchQuery = req.query.q;
  // search for the posts that match queries using operators and indexes
  const posts = await CoursesBlogPostModel.find({
    $text:{ 
      $search: searchQuery, 
      $caseSensitive: false,
      $diacriticSensitive: false 
    }
  }).populate({path:'userId', select:['_id', 'username']});
  // render the view
  res.render(
    'courses/courses.ejs',
    {
      coursesPosts: posts, 
      searching
    }
  );
}

module.exports = search;
