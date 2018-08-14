import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserSingle from './UserSingle'


class UsersList extends React.Component {

  render() {
    const { users } = this.props
    return (
      <Table>
        <Table.Body>
          {users.map( user => {
            return (
              <UserSingle id={user._id} key={'user'+user._id} user={user} />
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}
export default connect(mapStateToProps)(UsersList)
