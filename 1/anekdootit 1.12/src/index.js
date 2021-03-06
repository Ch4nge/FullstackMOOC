import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    const tempPisteet = 
      Array.apply(null, Array(props.anecdotes.length)).map(Number.prototype.valueOf,0)
    
    this.state = {
      selected: 0,
      most: 0,
      pisteet: tempPisteet
    }
  }

  handleClick = () => {
    this.setState({
      selected: Math.floor(Math.random() * this.props.anecdotes.length)
    })
  }

  vote = () => {
    const kopio = [...this.state.pisteet]
    kopio[this.state.selected] += 1
    const most = kopio.reduce((sum, votes, i) => {
      if(votes > kopio[sum])
        return i
      return sum
    }, 0)
    this.setState({
      pisteet: kopio,
      most: most
    })
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <div>
          <p>has {this.state.pisteet[this.state.selected]} votes </p>
          <button onClick={this.handleClick}>next anecdote</button>
          <button onClick={this.vote}>vote!</button>
        </div>
        <h1>anecdote with most votes</h1>
        <p>{this.props.anecdotes[this.state.most]}</p>
        <p>has {this.state.pisteet[this.state.most]} votes </p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)