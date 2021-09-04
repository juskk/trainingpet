import { Link } from "react-router-dom"
import React from 'react'
import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.Container}>
      <nav>
        <ul className={classes.Navigation}>
          <li className={classes.LinkHover}>
            <Link className={classes.Link} to="/">Info</Link> 
          </li>
          <li>
            <Link className={classes.Link} to="/courses">Courses</Link>
          </li>
        </ul>
      </nav>
      <div>
        <p className={classes.Icon}>icon</p>
      </div>
    </div>
  )
}

export default Header