import React, { useEffect } from 'react'
import CreateAuthor from '../Components/CreateAuthor'
import CreateBook from '../Components/CreateBook'
import { getAuthors } from '../feature/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const dispatch = useDispatch()


    const {token} = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(()=>{
      if(!token){
        navigate('/auth')
    }else{
      dispatch(getAuthors())

    }
    },[dispatch,token,navigate])
  return (
    <div className='create__page'> 
        <CreateAuthor/>
        <CreateBook />
    </div>
  )
}

export default Create