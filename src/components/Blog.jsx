import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggle = () => setShowDetails(!showDetails)

  const incLikes = () => updateLikes(blog)

  const remove = () => {
    const question = `Remove blog ${blog.title} by ${blog.author}?`
    if (window.confirm(question)) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} <b>{blog.author}</b> <BlogButton showDetails={showDetails} toggle={toggle} />
      </div>
      { showDetails &&
        <div className='blog-details'>
          <p style={{ margin: '0' }} className='blog-url'>{blog.url}</p>
          <p style={{ margin: '0' }} className='blog-likes'>
            likes {blog.likes} <button onClick={incLikes} className='like-button'>like</button>
          </p>
          <p style={{ margin: '0' }} className='blog-user-name'>{blog.user.name}</p>
          { blog.user.username === username &&
            <button onClick={remove} className='remove-button'>remove</button>
          }
        </div>
      }
    </div>
  )
}

const BlogButton = ({ showDetails, toggle }) => (
  <button onClick={toggle} className='details-button'>
    { showDetails ? 'hide' : 'view'}
  </button>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog