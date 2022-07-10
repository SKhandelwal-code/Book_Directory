import React from 'react'
import './logger.css'

const Logger = (props) => {
  return (
    <div className='logger' style={{backgroundColor:props.varient === 'danger'?'#FF9494':'green'}}>
      {props.message}
    </div>
  )
}

export default Logger