import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogFull from './components/BlogFull'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Togglable from './components/Togglable'
import UserFull from './components/UserFull'
import UsersList from './components/UsersList'
import blogService from './services/blogs'
import { notify } from './reducers/notifyReducer'
import { likeBlog, deleteBlog, initBlogs, createBlog } from './reducers/blogReducer'
import { initUser, login } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.initUsers()
    this.props.initBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      this.props.initUser(user)
      blogService.setToken(user.token)
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deleteBlog = (id) => async () => {
    const blog = this.props.blogs.find(blog => blog.id ===id)
    const ok  =
        !window.confirm(`delete ${blog.title} by ${blog.author}`)
    if(ok){
      return
    }
    this.props.deleteBlog(id)
    this.props.notify({
      message: 'deleted ' +blog.author,
      type: 'success' }, 5000)
  }

  like = (id) => async () => {
    const blog = this.props.blogs.find(blog => blog.id === id)
    this.props.likeBlog(blog)
    this.props.notify({
      message: 'you liked '+blog.title,
      type: 'success' }, 5000)
  }

  createBlog = async (blog) => {
    this.props.createBlog(blog)
    this.props.notify({
      message: 'a New blog created!',
      type: 'success' }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    const { username, password } = this.state
    try {
      this.props.login({
        username,
        password
      })


      this.setState({
        username: '',
        password: '',
      })
    } catch (e) {
      this.props.notify({
        message: 'bad password or username',
        type: 'error'
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.clear()
    this.props.initUser(null)
  }

  loginForm = () => {
    const { password, username } = this.state
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
    const sortByLikes = (b1, b2) => b2.likes - b1.likes
    const sortedBlogs = this.props.blogs.sort(sortByLikes)

    return (
      <Container>
        <Router>
          <div>
            <Navigation logoutF={this.logout}/>
            <Notification />
            {this.props.user !== null ?
              <Togglable buttonLabel="new blog">
                <BlogForm handleSubmit={this.createBlog} />
              </Togglable>
              :
              this.loginForm()
            }
            {this.props.user !== null ?
              <div>
                <h2>blogs</h2>
                {this.props.user.username} logged in
                <button onClick={this.logout}>logout</button>
                <div>
                  <Route exact path='/' render={ () => {
                    return(<div>
                      {sortedBlogs.map(blog =>
                        <Blog
                          key={'blogid'+blog.id}
                          deleteBlog={this.deleteBlog(blog.id)}
                          blog={blog}
                          like={this.like(blog.id)}
                          canDelete={blog.user === undefined ||
                              blog.user.username === this.props.user.username}/>
                      )}
                    </div>) }}/>

                  <Route exact path='/users' render={() => <UsersList />} />

                  <Route path='/users/:id' render={({ match }) =>
                    <UserFull id={match.params.id} />}/>

                  <Route path='/blogs/:id' render={({ match }) =>
                    <BlogFull id={match.params.id} />}/>
                </div>
              </div> : <div></div>
            }
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { initUsers, initUser, login, likeBlog, deleteBlog, createBlog, notify, initBlogs })(App)
