import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = { headers: { Authorization: token } }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, auth) => {
  setToken(auth)
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id, auth) => {
  setToken(auth)
  const authoriz = { headers: { Authorization: token } }

  console.log('auht', auth)
  console.log('config', config)

  const request = axios.delete(`${baseUrl}/${id}`, authoriz)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove }
