import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {

  let styles = [classes.DefaultButton]
  if (props.disabled) styles.push(classes.Disabled)

  if (props.type === 'submit') return (
    <button disabled={props.disabled} type="submit" className={classes.Button}>{props.children}</button>
  )

  return (
    <div 
      className={styles.join(' ')}
      onClick={props.disabled ? null : props.clicked}
    >
      {props.children}
    </div>
  )
}

export default Button
