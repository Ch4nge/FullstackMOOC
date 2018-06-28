import React from 'react'

const Statistic = (props) => {
    return(
      <p>{props.statistic.text} {props.statistic.number}</p>  
    )
  }
export default Statistic