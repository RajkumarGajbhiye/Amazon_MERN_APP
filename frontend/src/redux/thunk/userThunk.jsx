import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {USERS_LOGOUT_URL, USERS_SIGNIN_URL, USERS_SIGNUP_URL } from "../../api/api"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const userSignUp = createAsyncThunk(
    'user/fetchSignUpApi',
    async(userdata,{rejectWithValue})=>{
        try{
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json'
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_SIGNUP_URL}`,userdata,configAxios);
           
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
              }
           
           
    return response;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)


export const userSignIn = createAsyncThunk(
    'user/fetchSignInApi',
    async(userCredentials,{rejectWithValue})=>{
        try{
           
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json',
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_SIGNIN_URL}`,userCredentials,configAxios);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
       
    return response.data;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)


export const userLogout = createAsyncThunk(
    'user/fetchLogoutApi',
    async(logout,{rejectWithValue})=>{
        try{
           
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json',
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_LOGOUT_URL}`,logout,configAxios);
            if(response.data.success){
                localStorage.removeItem('user')
            }
       console.log(response.data)
    return response.data;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)
