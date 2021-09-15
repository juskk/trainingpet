import { Link } from "react-router-dom"
import React from 'react'
import classes from './Header.module.css'
import { useSelector } from "react-redux"

const Header = () => {

  const { token } = useSelector(state => state.auth)

  return (
    <div className={classes.Header}>
      <div className={classes.Container}>
        <nav>
          <ul className={classes.Navigation}>
            <p className={classes.Icon}>icon</p>
            <li className={classes.LinkHover}>
              <Link className={classes.Link} to="/">Info</Link> 
            </li>
            <li>
              <Link className={classes.Link} to="/courses">Courses</Link>
            </li>
          </ul>
        </nav>
        <div>
          { !token 
            ? <>
                <Link className={classes.Link} to="/login">Login</Link>
                <Link className={classes.Link} to="/register">Register</Link>
              </>
            : <Link className={classes.Link} to="/user">User</Link> 
          }  
        </div>
      </div>
    </div>
  )
}

export default Header