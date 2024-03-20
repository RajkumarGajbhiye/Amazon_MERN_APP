import { createSlice } from '@reduxjs/toolkit'
import {userSignUp} from '../thunk/userThunk';


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isLoading: false, // Flag for loading state
  error: null, // Store any errors
  success: false, // Indicate successful registration
  user: {},
  isAuthenticated:false,
}

 export const userSignUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(userSignUp.pending, state => {
      state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false
    })
     .addCase(userSignUp.fulfilled, (state, action) => {
      state.user = action.payload,
      state.isLoading = false;
      state.success = true;  
      state.isAuthenticated = true    
    })
    .addCase(userSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message; 
      state.user = null  ,
      state.isAuthenticated = false
    })
  },
})


export default userSignUpSlice.reducer;
 