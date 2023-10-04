import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ fetchAllBlogs, user, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const cleanBlogFormInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const notificate = (text, type = false) => {
    setErrorMessage({ text: text, isError: type })
    setTimeout(() => setErrorMessage(null), type ? 2000 : 3000)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    
    try {
      await blogService.create({title, author, url}, user.token)
      cleanBlogFormInputs()
      notificate(`a new blog ${title} by ${author} added`)
      fetchAllBlogs()      
    } catch(error) {
      console.log(error)
      if (error.response.data.error) {
        notificate(error.response.data.error, true)
      }
    }
  }

  return(
    <div>
      <h1>create new</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm