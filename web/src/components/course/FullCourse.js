import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { fetchCourse, deleteCourse, updateCourse } from '../../store/slices/courses'
import classes from './FullCourse.module.css'

const FullCourse = () => {
  const [course, setCourse] = React.useState({});
  const [leave, setLeave] = React.useState(false);
  const [changeMode, setChangeMode] = React.useState(false)

  const [name, setName] = React.useState(course.name | '');
  const [description, setDescription] = React.useState(course.description | '');
  const [author, setAuthor] = React.useState(course.author | '');
  const [isPublic, setPublicity] = React.useState(course.isPublic | false)


  const { loading, error } = useSelector(store => store.courses)
  const dispatch = useDispatch()
  const { id } = useParams()

  React.useEffect( () => {
    dispatch(fetchCourse(id))
    .then(res => {
      setCourse(res)
      setName(res.name)
      setDescription(res.description)
      setAuthor(res.author)
      setPublicity(res.isPublic)
    })
      
  }, [dispatch, id] )

  const removeCourse = () => {
    dispatch(deleteCourse(id))
    setLeave(true)
  }

  const toUpdateCourse = () => {
    console.log('started')
    dispatch(updateCourse({name, description, author, isPublic}, course._id))
    .then(res => {
      console.log(res)
      const info = res.data.data;
      setCourse(info)
      setChangeMode(false)
    })
    .catch(err => new Error(err))
  }

  if (leave) return <Redirect to="/courses"/>
  if (loading) return <p>loading</p>
  if (error) return <p>error</p>
  if (course) return (
    <div className={classes.Container}>
      {changeMode
      ? <div className={classes.ChangeContainer}>
          <input 
            style={{width: 100}} 
            type="text" 
            value={name} 
            onChange={ event => setName(event.target.value) }
          />
          <input 
            style={{width: 140}} 
            type="text" 
            value={description}
            onChange={ event => setDescription(event.target.value) }
            />
          <input 
            style={{width: 140}} 
            type="text" 
            value={author}
            onChange={ event => setAuthor(event.target.value) }
          />
          <input 
            type="checkbox"
            checked={isPublic}
            onChange={ () => setPublicity(prev => !prev) }
          />
          <div 
            onClick={toUpdateCourse}
            className={classes.Submit}
          >
            SUBMIT
          </div>
        </div>
      : (
        <div>
          <p>name: {course.name}</p>
          <p>description: {course.description}</p>
          <p>author: {course.author}</p>
          <div className={classes.PublicInfo}>
            <p>public: </p>
            <input checked={course.isPublic} type="checkbox"/>
          </div>
        </div>
      )}
      <div style={{display: 'flex'}}>
        <div 
          className={classes.Delete} 
          onClick={removeCourse}
        >
          REMOVE
        </div>
        <div
          className={classes.Change}
          onClick={ () => setChangeMode(prev => !prev) }
        >
          CHANGE
        </div>
      </div>
    </div>
  )

  return (
    <p>loading</p>
  )
}

export default FullCourse