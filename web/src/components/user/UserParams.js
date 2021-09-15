import React from 'react'

const UserParams = ({surname, name, age}) => {
  return (
    <div>
      <p>user info:</p>
      <p>surname: {surname}</p>
      <p>name: {name}</p>
      <p>age: {age}</p>
      <p></p>
    </div>
  )
}

export default UserParams