import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config= () => {
  return {
    headers: { 'Authorization': token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject, config())
  return req.data
}

const remove = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`, config())
  return req.data
}

const comment = async (id, comment) => {
  const req = axios.post(`${baseUrl}/${id}/comments`, comment, config())
  return req.data
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  comment
}
