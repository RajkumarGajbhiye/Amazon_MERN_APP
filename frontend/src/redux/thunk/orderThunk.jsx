import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {CREATE_ORDER_URL} from "../../api/api"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
 


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const orderData = await axios.post(
        `${BASE_URL}${CREATE_ORDER_URL}`,
        order,
        configAxios
      );
      
      return orderData.data;
      if(orderData.data){
        localStorage.setItem('user', JSON.stringify(orderData.data))
    }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
