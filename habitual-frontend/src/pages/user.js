import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';

const User = () => {
    const [ users, setUsers ] = useState();
    const axiosPrivate = useAxiosPrivate();
    axios.defaults.withCredentials = true

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('user/', {
                    signal: controller.signal
                });
                const data = response.data?.users
                isMounted && setUsers(data)
            } catch (err) {
                console.error(err)
            }
        }

        getUser()

        return () => {
            isMounted = false;
            controller.abort()
        }
    },[])

  return (
  <div>
    <h2>users list</h2>
    { users?.length ? (
         <ul>{users.map((user, i) => <li key={i}>{user?.email}</li>)}</ul>
        ) : <p>No user to display</p>
    }
    </div>
  )
}

export default User;