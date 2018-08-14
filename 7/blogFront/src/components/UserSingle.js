import React from 'react' 
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserSingle = ({ id, user }) => {
  return(
    <Table.Row>
      <Table.Cell> <Link to={'users/'+id}> {user.username} </Link></Table.Cell>
      <Table.Cell> {user.blogs.length} </Table.Cell>
    </Table.Row>
  )
}

export default UserSingle

