import React from 'react'
import User from './user';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../actions/userActions';

const Admin = () => {
    const { user } = useAuth()
    //const refresh = useRefreshToken();
    const dispatch = useDispatch();

    return (
      <div>
        <h1>This is the admin page</h1>
        { user && <>
        <h1>{user.email}</h1>
        <button onClick={() => dispatch(refreshToken())}>SignOut</button>
   
        <User />
        </>
        }
      </div>
    )
}

export default Admin;