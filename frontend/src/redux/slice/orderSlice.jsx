import { createSlice } from '@reduxjs/toolkit'
import { createOrder } from '../thunk/orderThunk';


const initialState = {
  isLoading: false, 
  error: null, 
  success: false, 
  orders: [],
  currentOrder: null,
  totalOrders: 0
}

 export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {

   
    builder
    .addCase(createOrder.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true; 
      state.orders.push(action.payload);  
      state.currentOrder = action.payload;   
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;     
    })

    
  },
})
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
 