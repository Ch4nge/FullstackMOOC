import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action)  => {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.content)
  case 'VOTE': {
    const oldAnecdotes = state.filter(a => a.id !== action.id)
    const updated = state.find(a => a.id === action.id)
    return [...oldAnecdotes, { ...updated, votes: updated.votes + 1 }]
  }
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes +1 }
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })}
}

export default reducer
