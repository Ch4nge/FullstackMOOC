import React from 'react'
import Statistic from './Statistic';

const Statistics = (props) => {
  if(props.yhteensa === 0)
    return <p>ei yhtään palautetta annettu</p>
  return(
    <table>
      <tbody>
        {props.statistics.map((statistic, i) => <Statistic statistic={statistic} key={i} />)}
      </tbody>
    </table>
  )
  }
export default Statistics