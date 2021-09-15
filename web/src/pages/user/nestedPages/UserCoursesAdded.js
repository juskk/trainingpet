import React from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import AddCourse from '../../../components/course/addCourse/ManipulateCourse'
import CoursePreview from '../../../components/course/coursePreview/CoursePreview';
import { fetchUserCourses, createCourse } from '../../../store/slices/courses';
import { getInfo } from '../../../store/slices/user';

const UserCoursesAdded = () => {
  const [create, setCreate] = React.useState(false)
  const [cookies] = useCookies(['user'])
  const dispatch = useDispatch()
  const { info } = useSelector(state => state.user)
  const { userCourses } = useSelector(state => state.courses)

  React.useEffect( () => {
    dispatch(getInfo(cookies.id))
    dispatch(fetchUserCourses(cookies.id))
  }, [cookies, dispatch])

  const toCreateCourse = async (courseInfo) => {
    await dispatch(createCourse({...courseInfo, userId: cookies.id, author: [info.surname, info.name].join(' ')}))
    dispatch(fetchUserCourses(cookies.id))
    setCreate(prev => !prev)
  }

  if(!info.surname || !info.name || !info.age) return <p>you need to set basic information about yourself at first</p>

  return (
    <div>
        <AddCourse 
          toCreate={toCreateCourse}
          create={create}
          close={() => setCreate(prev => !prev)}
        /> 
      { userCourses.length > 0
        ? (
          <div>
            <p>courses added:</p>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {userCourses.map(course => {
                return (
                  <CoursePreview 
                    author={[info.surname, info.name].join(' ')}
                    id={course._id}
                    name={course.name}
                    key={course._id}
                  />
                )
              })}
            </div>
          </div> 
        )
        : <p>no courses added</p>
      }
    </div>
  )
}

export default UserCoursesAdded