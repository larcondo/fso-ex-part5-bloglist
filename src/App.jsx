import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const fetchAllBlogs = () => {
    blogService.getAll().then(blogs => setBlogs( blogs )) 
  }
  
  useEffect(fetchAllBlogs, [])

  useEffect(() => {
    const loggedUserStored = window.localStorage.getItem('blLoggedUser')
    if (loggedUserStored) {
      setUser(JSON.parse(loggedUserStored))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('blLoggedUser')
    setUser(null)
  }

  const notificate = (text, type = false) => {
    setErrorMessage({ text: text, isError: type })
    setTimeout(() => setErrorMessage(null), type ? 2000 : 3000)
  }

  const createNewBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog, user.token)
      notificate(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      fetchAllBlogs()
    } catch(error) {
      console.log(error)
      if (error.response.data.error) {
        notificate(error.response.data.error, true)
      } else {
        notificate('an error occured while creating a new blog', true)
      }
    }
    blogFormRef.current.toggleVisibility()
  }

  const updateLikes = async (blog) => {
    try {
      await blogService.update(blog.id, { likes: blog.likes + 1 })
      fetchAllBlogs()
    } catch(e) {
      console.log(e)
      if (e.response.data.error) {
        notificate(e.response.data.error, true)
      } else {
        notificate('an error occured while updating blog', true)
      }
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id, user.token)
      notificate(`deleted blog: ${blog.title}`)
      fetchAllBlogs()
    } catch(e) {
      console.log(e)
      if (e.response.data.error) {
        notificate(e.response.data.error, true)
      } else {
        notificate('an error occured while deleting blog', true)
      }
    }
  }

  if (!user) return <LoginForm setUser={setUser} />

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      { user && 
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>        
      }

      { user && 
        <Togglable buttonLabel='new blog' ref={blogFormRef} >
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>
      }

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            username={user.username}
          />
        )}
    </div>
  )
}

export default App