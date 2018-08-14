import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch(action.type){
  case 'LOGIN':
    return action.user
  case 'INITUSER':
    return action.user
  default:
    return state
  }
}

export const login = (loginInfo) => {
  return async (dispatch) => {
    console.log(loginInfo)
    const user = await loginService.login({
      username: loginInfo.username,
      password: loginInfo.password
    })
    if(user){
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    }
    dispatch({
      type: 'LOGIN',
      user: user
    })
  }
}

export const initUser = (user) => {
  return async (dispatch) => {
    console.log(user)
    dispatch({
      type: 'INITUSER',
      user: user
    })
  }
}

export default reducer
