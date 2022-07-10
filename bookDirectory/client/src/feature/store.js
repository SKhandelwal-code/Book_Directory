import {configureStore} from '@reduxjs/toolkit';
import  userReducer  from './userSlice';
import  bookReducer  from './bookSlice';

export default configureStore({
    reducer:{
        user:userReducer,
        book:bookReducer
    }
})