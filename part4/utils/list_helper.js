const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const mostLikes = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  }, blogs[0]);

  return mostLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const count = _.countBy(blogs, 'author');
  const author = _.maxBy(_.keys(count), (author) => count[author]);

  return {
    author: author,
    blogs: count[author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const likes = _.chain(blogs)
    .groupBy('author')
    .mapValues((likes) => _.sumBy(likes, 'likes'))
    .value();

  const author = _.maxBy(_.keys(likes), (author) => likes[author]);

  return {
    author: author,
    likes: likes[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
