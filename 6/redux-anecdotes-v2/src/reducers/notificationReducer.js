const reducer = (state = { nVisible: false, text: '' }, action) => {
  console.log(action)
  switch(action.type){
  case 'NOTIFY':
    return {
      text: action.notification,
      nVisible: true
    }
  case 'CLEAR':
    return {
      text: '',
      nVisible: false
    }
  default:
    return state
  }
}

export const notify = (text, time) => {
  return async (dispatch) => {
    console.log(text)
    dispatch({
      type: 'NOTIFY',
      notification: text
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default reducer
