import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog, handleVote, addComment, handleDelete }) => {
  const [comment, setComment] = useState('')
  console.log(blog)

  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  if (!blog) {
    return null
  }

  const canRemove = blog.user
    ? blog.user.username === blog.user.username
    : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes
      <Button
        variant="outline-primary"
        onClick={() => handleVote(blog)}
        style={{ marginLeft: '5px' }}
      >
        like
      </Button>
      <br />
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <Form onSubmit={handleAddComment}>
        <Form.Group controlId="comment">
          <Form.Label>Add a comment:</Form.Label>
          <Form.Control
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
      {canRemove && (
        <Button
          variant="outline-danger"
          onClick={() => handleDelete(blog)}
          style={{ marginTop: '10px' }}
        >
          remove
        </Button>
      )}
    </div>
  )
}

export default Blog
