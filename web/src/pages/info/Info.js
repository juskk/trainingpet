import React from 'react';
import { useCookies } from 'react-cookie';

import classes from './Info.module.css'

const Info = () => {

  const [cookies] = useCookies(['user']);

  return(
    <div className={classes.Container}>
      <p>info page</p>
      <p onClick={() => console.log(cookies)}>get cookies</p>
    </div>
  )
}

export default Info