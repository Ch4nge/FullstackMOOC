import React from 'react'

const Statistic = (props) => {
    return(
      <tr><td>{props.statistic.text}</td><td>{props.statistic.number}</td></tr>
    )
  }
export default Statistic