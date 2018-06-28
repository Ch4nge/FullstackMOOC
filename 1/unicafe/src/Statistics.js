import React from 'react'
import Statistic from './Statistic';

const Statistics = (props) => {
    return(
      props.statistics.map((statistic, i) => <Statistic statistic={statistic} key={i} />)  
    )
  }
export default Statistics