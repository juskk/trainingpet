import React from 'react'
import { useCookies } from 'react-cookie'

import Button from '../../../UI/button/Button'
import { addCourse, checkCourse, removeCourse } from '../../../store/slices/courses'

const ReadingCoursePreview = ({name, author, description, courseId}) => {
  const [reading, setReading] = React.useState(null);
  const [check, setCheck] = React.useState(false)
  const [cookies] = useCookies(['user'])

  const toCheck = async () => {
    setCheck(prev => !prev)
    if (!check) {
      console.log('doing')
      const res = await checkCourse(cookies.id, courseId)
      setReading(res.data.reading)
    }
  }

  const coverButton = (event) => {
    event.stopPropagation()
  }

  const toAdd = async () => {
    console.log('add')
    await addCourse(cookies.id, courseId)
    const res = await checkCourse(cookies.id, courseId)
    setReading(res.data.reading)
  }

  const toRemove = async () => {
    console.log('remove')
    await removeCourse(cookies.id, courseId)
    const res = await checkCourse(cookies.id, courseId)
    setReading(res.data.reading)
  }

  return (
    <div onClick={toCheck} key={courseId}>
      <p>Course: {name} by {author}</p>
      { check
        ? (
          <div>
            <p>{description}</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div onClick={coverButton}>
                <Button clicked={toAdd} disabled={reading}>add</Button>
              </div>
              <div onClick={coverButton}>
                <Button clicked={toRemove} disabled={!reading}>remove</Button>
              </div>
            </div>
          </div>
        )
        : <p>check course</p> }
    </div>
  )
}

export default ReadingCoursePreview