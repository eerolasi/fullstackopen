import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const { message, type } = notification

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  }

  return (
    <Alert variant={type} style={style}>
      {message}
    </Alert>
  )
}

export default Notification
