import { useState } from 'react';

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateLikes(blog.id, updatedBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };
  console.log(blog.user.name);
  console.log(user);
  return (
    <div style={blogStyle} className="blog">
      <div className="title">{blog.title}</div>
      <div className="author"> {blog.author}</div>
      <div>
        <button onClick={toggleDetails} id="view" className="details">
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          likes {blog.likes}{' '}
          <button id="like-button" onClick={handleLikes}>
            like
          </button>
          <div>{blog.user.name}</div>
          {user.name === blog.user.name && (
            <button id="remove" onClick={handleRemove}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
