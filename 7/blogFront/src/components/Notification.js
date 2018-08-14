import React from 'react';
import { connect } from 'react-redux' 

const Notification = ({ message, type}) => {
  if (message === '') {
    return null
  }else if(type === "error"){
    return(
      <div className="error">
        {message}
      </div>      
    )
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    type: state.notification.type
  }
}

export default connect(mapStateToProps)(Notification)
