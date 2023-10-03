import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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

      { user && 
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>        
      }

      { user && <BlogForm fetchAllBlogs={fetchAllBlogs} user={user} /> }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App