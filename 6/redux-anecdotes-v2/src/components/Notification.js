import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { notification } = this.props
    if(notification.nVisible === false){
      return <div></div>
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
export default connect(mapStateToProps)(Notification)
