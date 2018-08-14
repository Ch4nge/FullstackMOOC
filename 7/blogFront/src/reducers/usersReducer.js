import usersService from '../services/users'

const reducer = (state = [], action ) => {
  console.log(action) 
  switch (action.type) {
    case 'INITUSERS':
      return action.users
    default:
      return state
  }
}


export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INITUSERS',
      users: users
    })
  }
}

export default reducer
