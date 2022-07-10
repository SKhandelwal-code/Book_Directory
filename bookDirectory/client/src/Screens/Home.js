import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import BookList from '../Components/BookList';
import { getBooks } from '../feature/bookSlice';
import { useNavigate } from "react-router-dom"

const Home = () => {

  // const {token} = useSelector(state => state.user)
  // const navigate = useNavigate()

  const dispatch = useDispatch();


  const {token} = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/auth')
  }else{
    dispatch(getBooks())

  }
  },[dispatch,token,navigate])

    return (
    <div className='container'>
        <BookList/>
    </div>
  )
}

export default Home