import React from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'

import Home from './Home'
//import Register from './Register'
import UserRegister from './UserRegister'
//import Login from './Login'
import UserLogin from './UserLogin'
import Mynotes from '../notes-component/Mynotes'
import Account from './Account'
import './navbar.css'

const Navbar = (props) => {
    const { logIn, handleAuth } = props
    const path = props.location.pathname
    //console.log(props)
    return(
        <div>
            <div className="navbar">
                <Link className={path === '/' ? "active" : ""} to='/'>Home</Link>
                {logIn ? 
                    <>
                        <Link className={path === '/mynotes' ? "active" : ""} to='/mynotes'>Notes</Link>
                        <Link className={path === '/account' ? "active" : ""} to='/account'>Account</Link>
                        <Link to='/' onClick={() => {
                            localStorage.removeItem('token')
                            //alert('logout successfully')
                            handleAuth()
                            props.history.push('/')
                        }}>Logout</Link>
                    </> :

                    <>
                        <Link className={path === '/register' ? "active" : ""} to='/register'>Register</Link>
                        <Link className={path === '/login' ? "active" : ""} to='/login'>Login</Link>
                    </>
                }
                
            </div>

            <Route path='/' component={Home} exact={true} />
            <Route path='/mynotes' component={Mynotes} />
            <Route path='/register' render={(props) => {
                return ( logIn ? <Redirect to='/' />:
                                <UserRegister
                                    {...props}
                                />
                        )
                }} 
            />
            <Route path='/login' render={(props) => {
                return ( logIn ? <Redirect to='/' />:
                                <UserLogin
                                    {...props}
                                    handleAuth={handleAuth}
                                />
                        )
                }}
            />
            <Route path='/account' component={Account} />
        
        </div>
    )
}
const wrappedComponent = withRouter(Navbar)
export default wrappedComponent