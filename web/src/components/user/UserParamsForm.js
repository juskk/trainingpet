import React from 'react'
import Button from '../../UI/button/Button';

const UserParamsForm = ({ manipulateInfo, gotInfo, getBack }) => {
  const [info, setInfo] = React.useState({
    surname: gotInfo ? gotInfo.surname : '',
    name: gotInfo ? gotInfo.name : '',
    age: gotInfo ? gotInfo.age : ''
  })

  const changeParam = (name, event) => {
    const newInfo = {...info}
    newInfo[name] = event.target.value
    setInfo(newInfo)
  }

  const submitForm = () => {
    if (gotInfo) {
      manipulateInfo(info)
      getBack()
    } else {
      manipulateInfo(info)
    }
  }

  return (
    <div style={{display: 'inline-flex', flexDirection: 'column', padding: '20px 0'}}>
      { gotInfo ? <p onClick={getBack}>get back</p> : null  }
      <p> 
        { gotInfo 
        ? 'Change information about yourself' 
        : ' still no info. its time to set your basic information' 
        } 
      </p>
      <input placeholder="surname" value={info.surname} onChange={ (event) => changeParam('surname', event) } />
      <input placeholder="name" value={info.name} onChange={ (event) => changeParam('name', event) }/>
      <input placeholder="age" value={info.age} onChange={ (event) => changeParam('age', event) }/>
      <Button clicked={submitForm}>
        { gotInfo ? 'change' : 'create' }
      </Button>
    </div>
  )
}

export default UserParamsForm