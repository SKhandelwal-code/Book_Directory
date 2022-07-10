import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const createBook = createAsyncThunk('book/createBook', async (values, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
        const { user } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        }
        const res = await axios.post('http://localhost:5000/api/createBook', values.values, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getBooks = createAsyncThunk('book/getAllBooks', async (arg, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
        const { user } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        }
        const res = await axios.get('http://localhost:5000/api/getAllBooks', config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteBook = createAsyncThunk('book/deleteBook', async (values, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
        const { user } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        }
        const res = await axios.delete(`http://localhost:5000/api/deleteBook/${values.id}`, config);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
        books: [],
        message: "",
        error: null,
        loading: false,
        createBookError: null,
        book: {},
        status: false
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: () => {return{...initialState,createBookError:null,message:null}},
    },
    extraReducers: {
        [createBook.pending]: (state, action) => {
            state.loading = true
        },
        [createBook.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
            state.status = action.payload.status
        },
        [createBook.rejected]: (state, action) => {
            state.loading = false;
            state.createBookError = action.payload.message || action.error.message;
        },
        [getBooks.pending]: (state, action) => {
            state.loading = true
        },
        [getBooks.fulfilled]: (state, action) => {
            state.loading = false;
            state.books = action.payload.allBooks;
            state.status = action.payload.status;
        },
        [getBooks.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message || action.error.message;
        },
        [deleteBook.pending]: (state, action) => {
            state.loading = true
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
        },
        [deleteBook.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message || action.error.message;
        }
    }
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;