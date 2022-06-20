import React, { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../actions/userActions';


const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(state => state.userLogin);
    console.log(dispatch(refresh()));
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        !user.user?.access ? verifyRefreshToken() : setIsLoading(false)
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`at: ${JSON.stringify(user.user?.access)}`)

    }, [isLoading])
    
  return (
    <>
    {isLoading ? <p>Loading......</p> : <Outlet />}
    </>
  )
}

export default PersistLogin