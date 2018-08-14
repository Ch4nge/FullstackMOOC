import React from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'
import { Button, Form, TextArea, Table, Header, Comment as Comm } from 'semantic-ui-react'
import { commentBlog, deleteBlog } from '../reducers/blogReducer'


class BlogFull extends React.Component {

  constructor() {
    super()
    this.state = {
      comment: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      comment: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.commentBlog(this.props.blog.id, this.state.comment)
    this.setState({
      comment: ''
    })
  }
  render() {
    const { blog, user } = this.props
    if(blog === null || blog === undefined){
      return <div> </div>
    }
    return (
      <div>
        <Header as='h2'>{blog.title}</Header>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {blog.url}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                has {blog.likes} likes
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                added by {blog.user ? blog.user.username : 'site'}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {blog.user.username === user.username ?
          <Button color='red' onClick={ () => this.props.deleteBlog(blog.id)}> Delete </Button>
          :
          <div></div>}
        <Comm.Group>
          <Header as='h3'> Comments </Header>
          {blog.comments.map((c,i) => <Comment key={'c'+i}comment={c} />)}
        </Comm.Group>
        <Form onSubmit={this.handleSubmit}>
          <TextArea placeholder='Comment..' onChange={this.handleChange} value={this.state.comment}/>
          <Button color='green'> Send </Button>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  const { id } = props
  console.log(id, state.blogs.find((b) => b.id === id.toString()))
  if (state.blogs === undefined){
    return null
  }
  return {
    blog: state.blogs.find((b) => b.id === id),
    user: state.user
  }
}

export default connect(mapStateToProps, { commentBlog, deleteBlog })(BlogFull)
