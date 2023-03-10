import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('user', JSON.stringify(user));
      console.log(username);
      console.log(password);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat({ ...createdBlog, user }));
      setMessage(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Failed to add blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateLikes = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject);
    console.log(updatedBlog);
    setBlogs(blogs.map((b) => (b.id === id ? blogObject : b)));
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {errorMessage && <Notification message={errorMessage} error={true} />}
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {errorMessage && <Notification message={errorMessage} error={true} />}

          {message && <Notification message={message} error={false} />}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
