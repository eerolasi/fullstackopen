import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
      dispatch(notify(`Blog created: ${blog.title}, ${blog.author}`))
    } catch (error) {
      dispatch(notify('Failed to create blog', 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(updateBlog(updatedBlog))
      dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
    } catch (error) {
      console.error('Failed to like blog:', error)
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(
        notify(`Blog ${blog.title} by ${blog.author} removed`, 'success')
      )
    } catch (error) {
      dispatch(notify('Failed to delete blog', error))
    }
  }
}

export const addCommentToBlog = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.createComment(blogId, comment)
      dispatch(updateBlog(updatedBlog))
      dispatch(notify('Comment added successfully!', 'success'))
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }
}

export default blogSlice.reducer
