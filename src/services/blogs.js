import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, blogToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return null
}

export default { getAll, create, update, deleteBlog }