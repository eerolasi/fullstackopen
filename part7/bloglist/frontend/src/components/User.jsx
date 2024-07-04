import { useMatch, useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
const User = ({ users }) => {
  const match = useMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup as="ul">
        {user.blogs.map((blog) => (
          <ListGroup.Item as="li" key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default User
