import React from 'react'

const Button = (props) => {
  if(props.buttonType === 'button'){
    return (
        <button
            type={props.type}
            onClick = {props.click}
            disabled = {props.disabled}
            className={props.classess}
        >
            {props.children}
        </button>
    )
  }
}

export default Button