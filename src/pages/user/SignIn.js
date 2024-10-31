import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userSignIn} from '../../features/userSlice';
import {Navigate} from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn({ username:email, password }));
    <Navigate to="/profile" />
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={loading}>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
