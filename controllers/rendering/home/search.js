const BlogPostModel = require('../../../models/blog/BlogPost');

const search = async (req, res) => {
  // check if we ara searching
  let searching = true;
  // get the queries form the search bar
  const searchQuery = req.query.q;
  // search for the posts that match queries using operators and indexes
  const posts = await BlogPostModel.find({
    $text:{ 
      $search: searchQuery, 
      $caseSensitive: false,
      $diacriticSensitive: false 
    }
  }).populate({path:'userId', select:['_id', 'username']});
  // render the view
  res.render(
    'home/home.ejs',
    {
      posts, 
      searching
    }
  );
}

module.exports = search;
