const initState = {
  message: '',
  type: 'success'
}

const reducer = (state = initState, action) => {
  switch(action.type){
    case 'NOTIFY':
      return action.notification
    case 'CLEAR':
      return initState 
    default:
      return state
  }
}

export const notify = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      notification: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time)
  }
}

export default reducer
