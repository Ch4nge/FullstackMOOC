import React from 'react'
import Persons from './Persons'
import Input from './Input'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filterName: ''
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addPerson = (event) => {
    event.preventDefault()
    const person = { 
      name: this.state.newName,
      number: this.state.newNum  
    }

    if(this.state.persons.filter( p => p.name === person.name).length === 0) {
      const tempPersons = this.state.persons.concat(person)
      this.setState({
        persons: tempPersons,
        newName: ''
      })
    }else{
      alert('Henkilö löytyy jo luettelosta')
      this.setState({
        newName: ''
      })
    }
    event.target.value = ''
  }

  componentDidMount() {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }


  render() {
    const { persons, newName, newNum, filterName } = this.state
    const filteredPersons = persons.filter( 
      person => person.name.toLocaleLowerCase().includes(filterName) 
    )
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <Input text="rajaa näyettäviä" name="filterName" value={filterName} onChange={this.onChangeHandler} />
          <h2>Lisää uusi</h2>
          <Input text="nimi" name="newName" value={newName} onChange={this.onChangeHandler} />
          <Input text="numero" name="newNum" value={newNum} onChange={this.onChangeHandler} />
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
        </form>
        <Persons persons={filteredPersons} />
      </div>
    )
  }
}

export default App