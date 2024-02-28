import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart_Array: [],
}

 export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    items_Add_To_Cart:(state,action)=>{
        state.cart_Array.push(action.payload) 
    },
    items_Remove_To_Cart:(state,action)=>{
        state.cart_Array = state.cart_Array.filter((ele)=>ele.id !== action.payload)
    },

  },

 
})

export const { items_Add_To_Cart, items_Remove_To_Cart } = cartSlice.actions;
export default cartSlice.reducer;
 