import React from 'react'

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
    const yhteensa = props.osat.reduce((sum, osa) => {
      return sum + osa.tehtavia
    }, 0)
    return(
      <p>yhteensä: {yhteensa}</p>
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

export default Kurssi