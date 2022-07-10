import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { reset } from '../feature/userSlice'

// import Button from './Button'
// import Create from '../Screens/Create';
import './nabar.css'

const NavBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('token');
        dispatch(reset())
        navigate('/auth')
    }
  return (
    <div className='navbar'>
        <div className='nav__logo'>
            <NavLink to ="/">
                Book Direcetory
            </NavLink>
        </div>
        <ul className='nav__list'>
            <li className='nav__item'>
                <NavLink to="/create">
                    Create
                </NavLink>
            </li>
            <li className='nav__item' onClick={handleClick}>
                Logout
            </li>
        </ul>
    </div>
  )
}

export default NavBar