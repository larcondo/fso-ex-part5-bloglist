import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  const fetchAllBlogs = () => {
    blogService.getAll().then(blogs => setBlogs( blogs )) 
  }

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

  if (!user) return(
    <LoginForm setUser={setUser} />
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      { user && 
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>        
      }

      { user && 
        <BlogForm 
          fetchAllBlogs={fetchAllBlogs} 
          user={user}
          setErrorMessage={setErrorMessage}
        /> 
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App