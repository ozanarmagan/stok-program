import {createSlice} from '@reduxjs/toolkit';

export const userReducer = createSlice({
    name:'user',
    initialState:{
        user:null,
        logged_in:false
    },
    reducers:{
        log_in: (state,action) => {
            state.user = action.payload;
            state.logged_in = true;
        },
        log_out: (state) => {
            state.user = null;
            state.logged_in = false;
        }
    }
});

export const {log_in,log_out} = userReducer.actions;

export default userReducer.reducer;