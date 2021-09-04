import React from 'react';
import { useSelector } from 'react-redux';
import ManipulateCourse from '../../components/course/addCourse/ManipulateCourse';
import CoursePreview from '../../components/course/coursePreview/CoursePreview';
import classes from './Courses.module.css'

const Courses = () => {
  const [creating, setCreating] = React.useState(false)
  const store = useSelector(store => store.courses)

  if (store.loading) return <p className={classes.Container}>loading</p>
  if (store.courses) return (
    <div className={classes.Container}>
      <p 
      className={classes.Create}
      onClick={ () => setCreating(prev => !prev) }>create course</p>
      { creating ? <ManipulateCourse /> : null }
      {store.courses.map(course => (
        <CoursePreview
          name={course.name}
          author={course.author}
          id={course._id}
        />
      ))}
    </div>
  )
  if (store.error) return <p className={classes.Container}>error</p>

  return(
    <p className={classes.Container}>loading</p>
  )
}

export default Courses