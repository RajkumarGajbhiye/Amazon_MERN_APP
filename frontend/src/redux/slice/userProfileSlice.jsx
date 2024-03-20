import { createSlice } from '@reduxjs/toolkit'
import { get_user_Profile } from '../thunk/userThunk'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

  const initialState = {
    isLoading: false, // Flag for loading state
    error: null, // Store any errors
    success: false, // Indicate successful registration
   user :{},
   isAuthenticated: false,
  }

  export const userProfileSlice = createSlice({
    name: 'userprofile',
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
      .addCase(get_user_Profile.pending, state => {
        state.isLoading = true;
          state.error = null;
          state.isAuthenticated = false
      })
       .addCase(get_user_Profile.fulfilled, (state, action) => {
        state.user = action.payload,
        state.isLoading = false;
        state.success = true; 
        state.isAuthenticated = true
      })
      .addCase(get_user_Profile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message; 
        state.user = null;    
    
      })
    },
  })
  
  export default userProfileSlice.reducer

