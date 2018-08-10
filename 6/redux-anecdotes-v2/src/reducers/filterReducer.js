const reducer = (state = '' , action) => {
  console.log(action)
  switch(action.type){
  case 'FILTER':
    return action.text.toLowerCase()
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const filter = (text) => {
  return {
    type: 'FILTER',
    text: text
  }
}

export default reducer
