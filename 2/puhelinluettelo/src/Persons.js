import React from 'react'
import Person from './Person'

const Persons = (props) => {
  return (
  <div>
    <h2>Numerot</h2>
    <ul>
      {props.persons.map( person => <Person key={person.name} person={person} />)}
    </ul>
  </div>
  )
}

export default Persons