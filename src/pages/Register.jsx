import React from 'react'
import {Link} from 'react-router-dom';
export const Register = () => {
  return (
    <div className="auth">
      
      <form>
      <h1>Signup</h1>
        <input required type="text" re placeholder='username' />
        <input required type="email" placeholder='Email' />
        <input required type="password" placeholder='password' />
        
        <button>Submit</button>
        <p>This is error!!</p>
        <span>Have an account?<Link to="/Login">Register</Link></span>
      </form>
    </div>
  )
}
