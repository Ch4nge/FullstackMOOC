import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BlogForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      title: "",
      author: "",
      url: "" 
    }
  }

  onChangeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value 
    });
  } 

  submitHelper = (f) => {
    const { title, author, url } = this.state
    const blog = { 
      title: title,
      author: author,
      url: url }
    console.log(blog);
    this.props.handleSubmit(blog)
  } 

  render(){
    const { url, author, title } = this.state
    return(
      <form>
          <div>
            title:
            <input 
              text="title"
              onChange={this.onChangeHandler}
              value={title}
              name="title" />
          </div>
          <div>
            author:
            <input
              text="author"
              onChange={this.onChangeHandler}
              value={author}
              name="author" />
          </div>
          <div>
            url:
            <input
              text="url"
              onChange={this.onChangeHandler}
              value={url}
              name="url" />
          </div>
          <div>
            <button onClick={(event) => {
              event.preventDefault()
              this.submitHelper(this.props.handleSubmit)} }>
              Create
            </button> 
          </div>
      </form>
    ) 
  }
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm;
