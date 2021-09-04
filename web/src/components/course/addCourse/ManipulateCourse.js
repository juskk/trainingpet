import React from 'react'
import { useDispatch } from 'react-redux';
import { createCourse } from '../../../store/slices/courses';
import classes from './ManipulateCourse.module.css'

const ManipulateCourse = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [isPublic, setPublicity] = React.useState(false);

  const dispatch = useDispatch()

  const toCreateCourse = () => {
    dispatch(createCourse({name, description, author, isPublic}))
  }

  return (
    <div className={classes.Container}>
      <input 
        type="text" 
        placeholder="name"
        value={name}
        onChange={ (event) => setName(event.target.value) }
      />
      <input 
        type="text" 
        placeholder="description"
        value={description}
        onChange={ (event) => setDescription(event.target.value) }
      />
      <input 
        type="text" 
        placeholder="author"
        value={author}
        onChange={ (event) => setAuthor(event.target.value) }
      />
      <input 
        type="checkbox"
        checked={isPublic}
        onChange={ () => setPublicity(prev => !prev) }
      />
        <div className={classes.Create} onClick={toCreateCourse}>create</div>
    </div>
  )
}

export default ManipulateCourse