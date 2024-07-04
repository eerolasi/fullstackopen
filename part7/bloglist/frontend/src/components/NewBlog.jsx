import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          style={{ marginBottom: '10px' }}
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

NewBlog.propTypes = {
  doCreate: PropTypes.func.isRequired,
}

export default NewBlog
