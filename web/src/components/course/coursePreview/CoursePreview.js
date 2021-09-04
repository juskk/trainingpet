import React from 'react'
import { Link } from 'react-router-dom';
import classes from './CoursePreview.module.css'

const CoursePreview = ({name, author, id}) => {
  return (
    <Link
      className={classes.Link}
      to={"/courses/" + id}
      key={id}
    >
      Course: '{name}' by {author}
    </Link>
  )
}

export default CoursePreview