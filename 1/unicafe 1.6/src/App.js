import React, { Component } from 'react'
import Button from './Button'
import Statistic from './Statistic'
import Statistics from './Statistics'

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
  
  
  handleClick = (option) => () => {
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



  render() {
    const round = (number) => Math.round(number * 10) /10 
    const yhteensa = this.state.huono + this.state.hyva + this.state.neutraali

    const statistics = [
      {
        text: 'hyva',
        number: this.state.hyva
      },
      {
        text: 'neutraali',
        number: this.state.neutraali
      },
      {
        text: 'huono',
        number: this.state.huono
      },
      {
        text: 'keskiarvo',
        number: round(this.state.kaikki / yhteensa)
      },
      {
        text: 'positiivisia',
        number: round(this.state.hyva / yhteensa * 100) + ' %'
      }
    ]

    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button text='Hyvä' handleClick={this.handleClick('hyva')} />
        <Button text='Neutraali' handleClick={this.handleClick('neutraali')} />
        <Button text='Huono' handleClick={this.handleClick('huono')} />
        <h1>statistiikka</h1>
        <Statistics statistics={statistics} yhteensa={yhteensa}/>
      </div>
    );
  }
}

export default App;
