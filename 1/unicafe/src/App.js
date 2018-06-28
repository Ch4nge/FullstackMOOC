import React, { Component } from 'react';
import Button from './Button';

class App extends Component {

  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      kaikki: 0
    }
  }
  
  handleClick = (event) => {
    console.log(event)
    //this.setState({ option: this.state.option + 1})
  }

  render() {
    const handleClick = (option) => () => {
      let arvo
      switch(option){
        case 'hyva': 
          arvo = 1
          break
        case 'neutraali': 
          arvo = 0
          break
        case 'huono': 
          arvo = -1 
      }
      this.setState({ 
        [option]: this.state[option] + 1,
        kaikki: this.state.kaikki + arvo
      })
    }

    const round = (number) => Math.round(number * 10) /10 

    const yhteensa = this.state.huono + this.state.hyva + this.state.neutraali

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
        <p>keskiarvo: {round(this.state.kaikki / yhteensa)} </p>
        <p>positiivisia: {round(this.state.hyva / yhteensa * 100)} % </p>
        <p></p>
      </div>
    );
  }
}

export default App;
