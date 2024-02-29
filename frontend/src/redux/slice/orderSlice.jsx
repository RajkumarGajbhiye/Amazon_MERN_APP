import { createSlice } from '@reduxjs/toolkit'
import { createOrder } from '../thunk/orderThunk';


const initialState = {
  isLoading: false, 
  error: null, 
  success: false, 
  
}

 export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

   
    builder
    .addCase(createOrder.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(createOrder.fulfilled, (state, action) => {
      state.products_Array = action.payload,
      state.isLoading = false;
      state.success = true;      
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message; 
      state.products_Array = null     
    })

    
  },
})


export default orderSlice.reducer;
 