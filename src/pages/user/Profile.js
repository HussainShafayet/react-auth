import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {fetchProfile} from '../../features/userSlice';

const Profile = () => {
  const [count ,setCount] = useState(0);
  const dispatch = useDispatch()
  const handleClick = () =>{
    console.log('click');
    setCount((prev)=> prev+1);
  }
  useEffect(() => {
   dispatch(fetchProfile());
  }, [dispatch])
  
  return (
    <div>Profile
    <button onClick={handleClick}>Add {count}</button>
    </div>
  )
}

export default Profile