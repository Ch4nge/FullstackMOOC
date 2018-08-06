import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: "",
      error: null,
      errorType: "error"
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({user})
    }
  } 

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deleteBlog = (id) => async () => {
    const blog = this.state.blogs.find(blog => blog.id ===id)
    const ok  = 
        !window.confirm(`delete ${blog.title} by ${blog.author}`)
    if(ok){
      return
    }
    await blogService.remove(id)
    this.triggerError('deleted ' +blog.author, 'success')
    const updatedBlogs = await blogService.getAll()
    this.setState({ blogs: updatedBlogs })
  }

  like = (id) => async () => {
    const old = this.state.blogs.find(blog => blog.id === id)
    const newBlog = {...old, likes: old.likes+1 }
    await blogService.update(id, newBlog)
    this.triggerError('you liked '+newBlog.name, 'success')
    const updatedBlogs = await blogService.getAll()
    this.setState({ blogs: updatedBlogs })
  }

  createBlog = async (blog) => {
    await blogService.create(blog)
    const updatedBlogs = await blogService.getAll()
    this.setState({blogs: updatedBlogs})
    this.triggerError('a New blog created!', 'success')
  }

  login = async (event) => {
    event.preventDefault()
    const { username, password } = this.state
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (e) {
      this.triggerError('bad password or username', 'error')
    }  
  }
  
  triggerError = (e, et) => {
    this.setState({
      error: e,
      errorType: et
    })
    setTimeout( () => {
      this.setState({
        error: null,
        errorType: ''
      })  
    }, 5000)
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear() 
    this.setState({
      user: null 
    })
  }

  loginForm = () => {
    const {password, username} = this.state
      return (
        <form>
          <div>
            Username:
            <input 
              text="username"
              onChange={this.onChangeHandler}
              value={username}
              name="username" />
          </div>
          <div>
            Password:
            <input
              text="password"
              onChange={this.onChangeHandler}
              value={password}
              name="password" />
          </div>
          <div> <button onClick={this.login}>login</button></div>
        </form>
      )
  }
  render() {
    const { user, error, errorType } = this.state
    const sortByLikes = (b1, b2) => b2.likes - b1.likes
    const sortedBlogs = this.state.blogs.sort(sortByLikes)
    return (
      <div>
        <Notification type={errorType} message={error} />
        {user !== null ? 
            <Togglable buttonLabel="new blog">
              <BlogForm handleSubmit={this.createBlog} />  
            </Togglable>
            :
            this.loginForm()
        }
        { user !== null ?
        <div>
        <h2>blogs</h2>
        {user.username} logged in
        <button onClick={this.logout}>logout</button>
        {sortedBlogs.map(blog => 
          <Blog 
            key={blog.id}
            deleteBlog={this.deleteBlog(blog.id)}
            blog={blog} 
            like={this.like(blog.id)} 
            canDelete={blog.user === undefined || 
              blog.user.username === this.state.user.username}/>
        )}
        </div> : <div></div> }
      </div>
    );
  }
}

export default App;
