import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anecdote: ''
    }
  }

  onChange = (event) => {
    this.setState({
      anecdote: event.target.value 
    })
  }

  newAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'NEW',
      anecdote: this.state.anecdote
    })
    this.setState({anecdote: ''})
  }

  render() {
    const anecdotes = this.props.store.getState()

    const sortByVotes = (a1, a2) => a2.votes -a1.votes

    anecdotes.sort(sortByVotes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={ () => {
                this.props.store.dispatch({
                    type: 'VOTE',
                    id: anecdote.id
                })
              }}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.onChange}/></div>
          <button onClick={this.newAnecdote}>create</button> 
        </form>
      </div>
    )
  }
}

export default App
