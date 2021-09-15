import React from 'react'
import classes from './ManipulateCourse.module.css'

const ManipulateCourse = ({toCreate, create, close}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isPublic, setPublicity] = React.useState(false);

  return (
    <div className={classes.Container}>
      <p style={{display: 'inline'}} onClick={close}>create course</p>
      { create 
        ? (
          <>
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
            type="checkbox"
            checked={isPublic}
            onChange={ () => setPublicity(prev => !prev) }
          />
          <div className={classes.Create} onClick={() => toCreate({name, description, isPublic})}>create</div>
          </>
        )
      : null}
    </div>
  )
}

export default ManipulateCourse