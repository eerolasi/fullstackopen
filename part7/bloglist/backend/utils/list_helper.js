const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max;
  });
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');

  const blogsCount = _.map(grouped, (blogs, author) => {
    return {
      author: author,
      blogs: blogs.length,
    };
  });

  const most = _.maxBy(blogsCount, 'blogs');
  return most;
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');

  const blogsLikes = _.map(grouped, (blogs, author) => {
    return {
      author: author,
      likes: _.sumBy(blogs, 'likes'),
    };
  });
  const most = _.maxBy(blogsLikes, 'likes');
  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
