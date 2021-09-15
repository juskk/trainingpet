import React from 'react';
import { useSelector } from 'react-redux';
import ReadingCoursePreview from '../../components/course/readingCoursePreview/ReadingCoursePreview';
import classes from './Courses.module.css'

const Courses = () => {
  const store = useSelector(store => store.courses)

  if (store.loading) return <p className={classes.Container}>loading</p>
  if (store.courses) return (
    <div className={classes.Container}>
      {store.courses.map(course => (
        <ReadingCoursePreview 
          author={course.author}
          name={course.name}
          courseId={course._id}
          description={course.description}
          key={course._id}
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