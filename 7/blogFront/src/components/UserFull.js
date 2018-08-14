import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Header, Image } from 'semantic-ui-react'

class UserFull extends Component {

  render() {
    const { user } = this.props

    console.log(user, 'täälä')
    if(user === undefined || user ===null) {
      return <div> Couldnt find user </div>
    }

    return (
      <div>
        <Header as='h2'>
          <Image circular
            src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
          {this.props.user.username}
        </Header>
        <Header as='h3'> Blogs by user </Header>
        <List divided relaxed>
          {this.props.user.blogs.map((blog) => {

            return (
              <List.Item key={'ublog'+blog._id}>
                <List.Icon name='pencil' size='large' verticalAlign="middle" />
                <List.Content>
                  <List.Header as='a'> {blog.url} </List.Header>
                  <List.Description as='a'> {blog.title} </List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props
  console.log(state, 'täälä' )

  if(state.users === null) {
    return { user: null }
  }

  return {
    user: state.users.find( u => u._id === id)
  }
}

export default connect(mapStateToProps)(UserFull)
