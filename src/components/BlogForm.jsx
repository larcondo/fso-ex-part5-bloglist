import { useState } from 'react'
import PropTypes from 'prop-types'

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
          <input
            className='input-title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            className='input-author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            className='input-url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='create-button'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm