import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [ logIn, setLogIn ] = useState(false)
    
  const handleAuth = () => {
    setLogIn(!logIn)
  }


  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  }, [])
  

  return (
    <div>
        <h1 className="heading">User Authentication - Notes</h1>
        <Navbar logIn={logIn} handleAuth={handleAuth} />
    </div>
  )
}

export default App
