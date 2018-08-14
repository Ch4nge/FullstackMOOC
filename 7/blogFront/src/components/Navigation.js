import React from 'react' 
import { Menu } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 

class Navigation extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { user, logoutF } = this.props
    console.log(logoutF, "Moi") 
    return (
      <Menu>
        <Menu.Item
          name='blogs'
          as='div'
          active={activeItem === 'blogs'}
          onClick={this.handleItemClick}
        >
          <Link to='/'> Blogs </Link>
        </Menu.Item>

        <Menu.Item
          name='users'
          as='div'
          active={activeItem === 'users'}
          onClick={this.handleItemClick}
        >
          <Link to="/users"> Users </Link> 
        </Menu.Item>
        <Menu.Item as='div' position='right'>
          {user ? user.username+' logged in' : ''} {user ? <a onClick={logoutF}>. Logout </a> : <div></div>} 
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Navigation)
