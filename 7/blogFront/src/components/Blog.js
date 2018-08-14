import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Blog extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    const { blog } = this.props
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return(
      <div style={blogStyle} >
        <div className="titleDiv" >
          <Link to={'/blogs/'+blog.id}> {blog.title} {blog.author} </Link>
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
