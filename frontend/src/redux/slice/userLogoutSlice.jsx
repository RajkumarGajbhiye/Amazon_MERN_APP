import { createSlice } from '@reduxjs/toolkit'
import { userLogout } from '../thunk/userThunk';



  const initialState = {
    isLoading: false, // Flag for loading state
    error: null, // Store any errors
   user : null,
   isAuthenticated: false,
  }

  export const userLogoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
      .addCase(userLogout.pending, state => {
        state.isLoading = true;
          state.error = null;
      })
       .addCase(userLogout.fulfilled, (state) => {
        state.user = null,
        state.isLoading = false;  
        state.isAuthenticated = false   
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;     
      })
    },
  })
  
  export default userLogoutSlice.reducer

