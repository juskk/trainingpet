import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
  return (
    <input 
      className={classes.Input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
    />
  )
}

export default Input
