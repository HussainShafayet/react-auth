import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {checkAuth} from '../../features/userSlice';

const Profile = () => {
  const [count ,setCount] = useState(0);
  const dispatch = useDispatch()
  const handleClick = () =>{
    setCount((prev)=> prev+1)
    dispatch(checkAuth());
  }
  return (
    <div>Profile
    <button onClick={handleClick}>Add {count}</button>
    </div>
  )
}

export default Profile