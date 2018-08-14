import React from 'react'
import { Comment as Comm } from 'semantic-ui-react'

class Comment extends React.Component {
  render() {
    return (
      <Comm>
        <Comm.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comm.Content>
          <Comm.Author as='a'> Anonymous </Comm.Author>
          <Comm.Text>
            {this.props.comment}
          </Comm.Text>
        </Comm.Content>
      </Comm>
    )
  }
}

export default Comment
