const BlogPostModel = require('../../../models/blog/BlogPost');

const searchBlogPosts = async (req, res) => {
  let searching = true;
  const searchQuery = req.query.q;
  const posts = await BlogPostModel.find({
    $text:{ 
      $search: searchQuery, 
      $caseSensitive: false,
      $diacriticSensitive: false 
    }
  }).populate({path:'userId', select:['_id', 'username']});
  console.log(posts);
  res.render(
    'home/home.ejs',
    {
      posts: posts, 
      searching: searching
    }
  );
}

module.exports = searchBlogPosts;
