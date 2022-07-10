import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const signUp = createAsyncThunk('user/signUp',async(values,{rejectWithValue})=>{
    try{
    const res = await axios.post('http://localhost:5000/api/signUp',values.values);
    return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
});

export const signIn = createAsyncThunk('user/signIn',async(values,{rejectWithValue})=>{
    try{
    const res = await axios.post('http://localhost:5000/api/signIn',values.values);
    return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
});

export const createAuthor = createAsyncThunk('user/createAuthor',async(values,thunkAPI)=>{
    const {getState,rejectWithValue} = thunkAPI;
    try{
    const {user} = getState()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    const res = await axios.post('http://localhost:5000/api/createAuthor',values.values,config);
    return res.data;
    }catch(error){
    return rejectWithValue(error.response.data)

    }
})

export const getAuthors = createAsyncThunk('user/getAuthors',async(arg,thunkAPI)=>{
    const {getState,rejectWithValue} = thunkAPI;
    try{
    const {user} = getState()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    const res = await axios.get('http://localhost:5000/api/getAllUsers',config);
    return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
})


const initialState = {
    users:[],
    message:"",
    loginError:null,
    registerError:null,
    authorError:null,
    loading:false,
    token:localStorage.getItem('token'),
    user:{},
    status:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        reset: () => {return{...initialState,token:null}},
    },
    extraReducers:{
        [signUp.pending]:(state,action)=>{
            state.loading = true
        },
        [signUp.fulfilled]:(state,action)=>{
            state.loading = false;
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)
            // state.message = action.payload
        },
        [signUp.rejected]:(state,action)=>{
            state.loading = false;
            state.registerError = action.payload.message || action.error.message;
        },
        [signIn.pending]:(state,action)=>{
            state.loading = true
        },
        [signIn.fulfilled]:(state,action)=>{
            state.loading = false;
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)
            // state.message = action.payload
        },
        [signIn.rejected]:(state,action)=>{
            state.loading = false;
            state.loginError = action.payload.message || action.error.message;
        },
        [createAuthor.pending]:(state,action)=>{
            state.loading = true
        },
        [createAuthor.fulfilled]:(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        [createAuthor.rejected]:(state,action)=>{
            state.loading = false;
            state.authorError = action.payload.message || action.error.message;
        },
        [getAuthors.pending]:(state,action)=>{
            state.loading = true
        },
        [getAuthors.fulfilled]:(state,action)=>{
            state.loading = false;
            state.users = action.payload.users;
            state.status = action.payload.status;
        },
        [getAuthors.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message || action.error.message;
        }
    }
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;