import axios from "axios";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    MY_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL
} from "../constants/orderConstant"

// Create Order 
export const createOrder =(order) => async(dispatch, getState) =>{
  
    try{
        dispatch({ type:CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type" : "application/json",
            }
        };
        const {data} = await axios.post("/api/v1/order/new", order, config);

    
       

        dispatch({type: CREATE_ORDER_SUCCESS, payload : data})

    }catch(Error){
        dispatch(
            {type: CREATE_ORDER_FAIL,
             payload :
            Error.response.data.error })
    }
}

// My Order 
export const myOrders =() => async(dispatch) =>{
    try{
        dispatch({ type:MY_ORDERS_REQUEST });

      
        const {data} = await axios.get("/api/v1/orders/me");
        console.log(data)
 

        dispatch({type: MY_ORDERS_SUCCESS, payload : data.orders})

    }catch(Error){
        dispatch(
            {type: MY_ORDERS_FAIL ,
             payload :
            Error.response.data.error })

    }
}

// Get ALL ORDERS  (Admin) 
export const getAllOrders =() => async(dispatch) =>{
    try{
        dispatch({ type:ALL_ORDERS_REQUEST });

      
        const {data} = await axios.get("/api/v1/admin/orders");
 

        dispatch({type: ALL_ORDERS_SUCCESS, payload : data.orders})

    }catch(Error){
        dispatch(
            {type: ALL_ORDERS_FAIL,
             payload :
            Error.response.data.error })

    }
}

export const getOrderDetails =(id) => async(dispatch) =>{
    try{
        dispatch({ type:ORDER_DETAILS_REQUEST });
        const {data} = await axios.get(`/api/v1/order/${id}`);
        
        dispatch({type: ORDER_DETAILS_SUCCESS, payload : data.order})

    }catch(Error){
        dispatch(
            {type: ORDER_DETAILS_FAIL,
             payload :
            Error.response.data.error })

    }
}

// Update Order 
export const updateOrder =(id, order) => async(dispatch) =>{
   
    
    try{
        dispatch({ type:UPDATE_ORDERS_REQUEST });

        const config = {
            headers: {
                "Content-Type" : "application/json",
            }
        };
        const {data} = await axios.put(`/api/v1/admin/order/${id}`, order, config);
       

        dispatch({type: UPDATE_ORDERS_SUCCESS, payload : data.success})

    }catch(Error){
        dispatch(
            {type: UPDATE_ORDERS_FAIL,
             payload :
            Error.response.data.error })

    }
}


// Delete Order 
export const deleteOrder =(id) => async(dispatch) =>{
    
    try{
        dispatch({ type:DELETE_ORDERS_REQUEST });

        
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);
       

        dispatch({type: DELETE_ORDERS_SUCCESS, payload : data.success})

    }catch(Error){
        dispatch(
            {type: DELETE_ORDERS_FAIL,
             payload :
            Error.response.data.error })

    }
}


    // clearing Errors

export const Clear_Errors=()=> async (dispatch) =>{
        dispatch({type : CLEAR_ERRORS})
    
    }
