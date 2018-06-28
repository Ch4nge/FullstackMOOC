import React, { Component } from 'react';
import Button from './Button';

class App extends Component {

  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }
  
  handleClick = (event) => {
    console.log(event)
    //this.setState({ option: this.state.option + 1})
  }

  render() {
    const handleClick = (option) => () => { 
      this.setState({ [option]: this.state[option] + 1})
    }
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button text='Hyvä' handleClick={handleClick('hyva')} />
        <Button text='Neutraali' handleClick={handleClick('neutraali')} />
        <Button text='Huono' handleClick={handleClick('huono')} />
        <h1>statistiikka</h1>
        <p>hyva: {this.state.hyva}</p>
        <p>neutraali: {this.state.neutraali}</p>
        <p>huono: {this.state.huono}</p>
      </div>
    );
  }
}

export default App;
