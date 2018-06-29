import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {

  constructor(){
    super();
    this.state = {
      maat: [],
      maa: ''
    }
  }

  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all')
      .then( response => 
        this.setState({ maat: response.data })
      )
  }

  onChangeHandler = (event) => {
    this.setState({
      maa: event.target.value
    })
  }

  onClickHandler = (maa) => {
    this.setState({
      maa: maa
    })
  }

  renderCountrys(maat){
    if(maat.length > 10)
      return <p>too many matches, specify another filter</p>
    else if(maat.length === 1)
      return(
        <div>
          <h2>{maat[0].name}</h2>
          <p>Capital: {maat[0].capital}</p>
          <p>population: {maat[0].population} </p>
          <img src={maat[0].flag} />
        </div>
      )
    
    return(
      maat.map( (maa) => <p onClick={() => this.onClickHandler(maa.name)} key={maa.name}> {maa.name} </p>)
    )
  }

  render() {
    const {maat, maa} = this.state
    console.log(maa)
    const filterMaat = maat.filter( (m) =>{
      console.log(m.name.toLowerCase().includes(maa))
      return m.name.toLowerCase().includes(maa.toLowerCase())
    })
    return (
      <div>
        <form>
          <input value={maa} onChange={this.onChangeHandler} type="text" />
        </form>
        {this.renderCountrys(filterMaat)}
      </div>
    );
  }
}

export default App;
