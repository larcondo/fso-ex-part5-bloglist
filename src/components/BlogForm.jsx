import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const cleanBlogFormInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url })
    cleanBlogFormInputs()
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