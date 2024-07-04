import axios from 'axios'

const getAll = () => {
  const request = axios.get('/api/users')
  return request.then((response) => response.data)
}

export default { getAll }
