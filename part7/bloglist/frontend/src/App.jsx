import React, { useEffect, createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import storage from './services/storage'
import userService from './services/users'

import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import { notify } from './reducers/notificationReducer'
import {
  createBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog,
  addCommentToBlog,
} from './reducers/blogReducer'
import { login, logout, loadUserFromStorage } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { useMatch } from 'react-router-dom'
const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  const blogFormRef = createRef()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const match = useMatch('/blogs/:id')

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials))
      const user = storage.loadUser()
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleAddComment = async (blogId, comment) => {
    dispatch(addCommentToBlog(blogId, comment))
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}!`))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  if (!user) {
    return (
      <div className="container">
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu user={user.name} logout={handleLogout} />

      <h2>blog app</h2>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
              </Togglable>
              <Table striped>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td style={style}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              handleVote={handleVote}
              addComment={handleAddComment}
              handleDelete={handleDelete}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
