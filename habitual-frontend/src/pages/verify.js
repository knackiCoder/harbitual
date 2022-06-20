import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from '../actions/userActions';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function Verify() {
    const query = useQuery();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const verificationToken = query.get('token');
    const email = query.get('email')

    const userVerify = useSelector(state => state.userVerify);
    const { loading, error, user } = userVerify;


    useEffect(() => {
        if(!loading) {
            dispatch(verifyEmail(verificationToken, email));
        }

    })

    if(loading) {
        return (
            <h1>Loading..........</h1>
        )
    }

    if(error) {
        return (
            <h1>{error}</h1>
        )
    }


  return (
      <div>
          { user && <>
          <h1>`Welcome, ${user.name}. Redirecting to dashboard...`,</h1>
        </>
          }
    </div>
  )
}

export default Verify;