import { createSlice } from '@reduxjs/toolkit'
import { getAllProduct, getSingleProduct } from '../thunk/productThunk';


const initialState = {
  isLoading: false, 
  error: null, 
  success: false, 
  products_Array: [],
  productDetails:{},
}

 export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    //get All Products
    builder
    .addCase(getAllProduct.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(getAllProduct.fulfilled, (state, action) => {
      state.products_Array = action.payload,
      state.isLoading = false;
      state.success = true;      
    })
    .addCase(getAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message; 
      state.products_Array = null     
    })

    //get single product

    .addCase(getSingleProduct.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(getSingleProduct.fulfilled, (state, action) => {
      state.productDetails = action.payload,
      state.isLoading = false;
      state.success = true;      
    })
    .addCase(getSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;      
    })
  },
})


export default productSlice.reducer;
 