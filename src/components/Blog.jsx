import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <b>{blog.author}</b> <BlogButton showDetails={showDetails} toggle={toggle} />
        
      </div>
      { showDetails && 
        <div>
          <p style={{margin: '0'}}>{blog.url}</p>
          <p style={{margin: '0'}}>likes {blog.likes} <button>like</button></p>
          <p style={{margin: '0'}}>{blog.user.name}</p>
        </div>
      }
    </div>
  )
}

const BlogButton = ({ showDetails, toggle }) => (
  <button onClick={toggle}>
    { showDetails ? 'hide' : 'view'}
  </button>
)

export default Blog