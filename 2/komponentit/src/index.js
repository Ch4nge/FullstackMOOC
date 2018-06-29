import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
  return(
    <h1>{props.kurssi}</h1>
  )
}

const Osa = (props) => {
  return(
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Sisalto = (props) => {
  return(
    <div>
      {props.osat.map((osa) => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Yhteensa = (props) => {
  return(
    <p>yhteensä</p>
  )
}

const Kurssi = (props) => {
  const { kurssi } = props
  return(
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }


  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)