import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {

  voteAnecdote = (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(anecdote.content + ' voted', 5)
  }

  render() {
    const { anecdotes } = this.props
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.voteAnecdote(anecdote) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter))
  }
}
export default connect(
  mapStateToProps,
  { notify, voteAnecdote })(AnecdoteList)
