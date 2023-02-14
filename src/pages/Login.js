import React from 'react'
import {Link} from 'react-router-dom';
export const Login = () => {
  return (
    <div className="auth">
      
      <form>
      <h1>Login</h1>
        <input required type="text" placeholder='username' />
        <input required type="password" placeholder='password' />
        <button>Submit</button>
        <p>This is error!!</p>
        <span>Don't you have an account?<Link to="/Register">Register</Link></span>
      </form>
    </div>
  )
}
