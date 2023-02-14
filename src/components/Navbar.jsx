import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';



export const Navbar = () => {
  return (
    <div className="navBar">
      <div className="container">
        <div className="logo">
        <img src={Logo}  alt=""/>
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=art">
            <h4>Art</h4>
            </Link>
            <Link className='link' to="/?cat=science">
            <h4>science</h4>
            </Link>
            <Link className='link' to="/?cat=cinema">
            <h4>cinema</h4>
            </Link>
            <Link className='link' to="/?cat=design">
            <h4>design</h4>
            </Link>
            <Link className='link' to="/?cat=food">
            <h4>food</h4>
            </Link>
            <span>Vishnu</span>
            <span>Logout</span>
            <span className='write'>
              <Link to='/write'>Write</Link>
            </span>

        </div>
      </div>
    </div>
  )
}
