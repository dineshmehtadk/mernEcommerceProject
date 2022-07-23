import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
   
} from "../constants/userConstant";


import axios from "axios";

// Login
export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch({
            type:LOGIN_REQUEST});
        const config = {headers: {
            "Content-Type":"application/json"
        }};

        const {data} = await axios.post(
            `/api/v1/login`,
            {email, password},
            config
        );
        dispatch({type: LOGIN_SUCCESS, payload:data.user})

    }
    catch(Error){
        dispatch(
            {type: LOGIN_FAIL,
             payload :
            Error.response.data.error })
    }
};

// Register

export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/v1/register`, userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    }
    catch(Error){
        dispatch(
            {type: REGISTER_USER_FAIL,
             payload :
            Error.response.data.error })
    }
};

// Load User
export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({
            type:LOAD_USER_REQUEST});

        const {data} = await axios.get(
            `/api/v1/me`);
        dispatch({type: LOAD_USER_SUCCESS, payload:data.user})

    }
    catch(Error){
        dispatch(
            {type: LOAD_USER_FAIL,
             payload : Error.response.data.error })
    }
};

// Logout User
export const logout = () => async(dispatch) =>{
    try{
         await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS })

    }
    catch(Error){
        dispatch(
            {type: LOGOUT_FAIL,
             payload : Error.response.data.error })
    }
};

// Update Profile

export const updateProfile = (userData) => async (dispatch) => {
 
    
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
     
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    }
    catch(Error){
        dispatch(
            {type: UPDATE_PROFILE_FAIL,
             payload :
            Error.response.data.error })
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
 
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
     
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    }
    catch(Error){
        dispatch(
            {type: UPDATE_PASSWORD_FAIL,
             payload :
            Error.response.data.error })
    }
};

// Forget Password
export const forgetPassword = (email) => async (dispatch) => {

    try {
      dispatch({ type: FORGET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/api/v1/password/forget`, email, config);
   
  
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
    }  catch(Error){
        dispatch(
            {type: FORGET_PASSWORD_FAIL,
             payload :
            Error.response.data.error });
    }
  };



// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {

    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
   
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    }  catch(Error){
        dispatch(
            {type: RESET_PASSWORD_FAIL,
             payload :
            Error.response.data.error })
    }
  };





// clearing Errors

export const clearErrors=()=> async (dispatch) =>{
    dispatch({type : CLEAR_ERRORS})

}

// Get All  User
export const getAllUsers = () => async(dispatch) =>{
 

    try{
        dispatch({ type: ALL_USERS_REQUEST })
         const {data}= await axios.get(`/api/v1/admin/users`);
        dispatch({ type: ALL_USERS_SUCCESS, payload: data})

    }
    catch(Error){
        dispatch(
            {type: ALL_USERS_FAIL,
             payload : Error.response.data.error })
    }
};



// User Details
export const getUserDetails = (id) => async(dispatch) =>{
    try{
        dispatch({ type: USER_DETAILS_REQUEST })
         const {data}= await axios.get(`/api/v1/admin/user/${id}`);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })

    }
    catch(Error){
        dispatch(
            {type: USER_DETAILS_FAIL,
             payload : Error.response.data.error })
    }
};

// Update user
export const updateUser = (id, userData) => async (dispatch) => {
 
    try {
      dispatch({ type: UPDATE_USER_RESET });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
     
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    }
    catch(Error){
        dispatch(
            {type: UPDATE_USER_FAIL,
             payload :
            Error.response.data.error })
    }
};


// Delete user
export const deleteUser = (id) => async (dispatch) => {

    try {
      dispatch({ type: DELETE_USER_RESET });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
     
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    }
    catch(Error){
        dispatch(
            {type: DELETE_USER_FAIL,
             payload :
            Error.response.data.error })
    }
};