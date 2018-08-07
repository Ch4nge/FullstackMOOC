import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selected: false
    }
  }

  render() {
    const { blog, like, deleteBlog, canDelete } = this.props
     const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
     const visible = {
      display: this.state.selected? '' : 'none',
      margin: 10,
    } 
    return(  
      <div style={blogStyle} >
        <div onClick={() =>
          this.setState({ selected: !this.state.selected })}
          className="titleDiv" >
          {blog.title} {blog.author}
        </div>  
        <div style={visible} className='content'>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>{blog.likes} likes <button onClick={like}> like </button ></div>
          <div>added by {blog.user? blog.user.username : 'site'}</div>
          {canDelete ? <div> <button onClick={deleteBlog}>delete</button></div>: <div></div>}
        </div> 
      </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired
}
  

export default Blog
