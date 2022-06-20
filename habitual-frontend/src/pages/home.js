import React from 'react'
import useAuth from '../hooks/useAuth';

function Home() {
  const { user } = useAuth()
  console.log(user)

  return (
    <div>
      <h1>This is the home page</h1>
      { user && <>
      <h1>{user.email}</h1>
      <button>SignOut</button>
      </>
      }
    </div>
  )
}

export default Home;