import React from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReadingCourses } from '../../../store/slices/courses'

const UserCourses = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['user'])
  const {readingCourses} = useSelector(state => state.courses)

  React.useEffect( () => {
    dispatch(fetchReadingCourses(cookies.id))
  }, [cookies, dispatch] )

  console.log(readingCourses)

  return (
    <div>
      <p>reading courses</p>
    </div>
  )
}

export default UserCourses