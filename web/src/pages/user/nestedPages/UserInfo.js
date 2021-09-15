import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import { getInfo, setInfo, updateInfo } from '../../../store/slices/user'
import UserParams from '../../../components/user/UserParams';
import UserParamsForm from '../../../components/user/UserParamsForm';

import Button from '../../../UI/button/Button'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { info, loading, error } = useSelector(state => state.user)
  const [cookies] = useCookies(['user'])
  const [change, setChange] = React.useState(false)

  console.log(change, info)

  React.useEffect( () => {
    dispatch(getInfo(cookies.id))
  }, [cookies, dispatch] )

  const toSetInfo = (info) => {
    dispatch(setInfo({...info, userId: cookies.id}))
  }
  const toUpdateInfo = (updatedInfo) => {
    dispatch(updateInfo(info._id, {...updatedInfo, userId: cookies.id}))
  }

  if (info._id && change) return (
    <UserParamsForm 
      manipulateInfo={toUpdateInfo} 
      gotInfo={info}
      getBack={ () => setChange(false) }
    />
  )
  if (info._id) return (
    <>
      <UserParams name={info.name} surname={info.surname} age={info.age}/>
      <Button clicked={() => setChange(true)}>edit</Button>
    </>
  )
  if (!info._id && error && !loading) return (
      <UserParamsForm manipulateInfo={toSetInfo}/>
  )

  return (
    <p>loading</p>
  )
}

export default UserInfo