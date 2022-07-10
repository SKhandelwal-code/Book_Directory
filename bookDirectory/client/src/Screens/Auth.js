import React, { useEffect } from 'react'
import Login from '../Components/Login'
import Register from '../Components/Register'
import '../App.css'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const {token} = useSelector(state => state.user)
    const navigate = useNavigate()
    // const {token} = user
    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token,navigate])
  return (
    <div className='auth__page'>
        <Register/>
        <Login/>
    </div>
  )
}

export default Auth