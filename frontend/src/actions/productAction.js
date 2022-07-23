import axios from "axios"
import { ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_REVIEWS_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEWS_FAIL,
    DELETE_REVIEWS_REQUEST,
    DELETE_REVIEWS_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstant"


export const getProduct = (keyword = "", currentPage=1, price=[0, 90000], category, ratings=0)=>async(dispatch)=> {
    try{
      
        dispatch({
            type:ALL_PRODUCT_REQUEST})
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            
            if(category){
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
            }

            const {data} = await axios.get(link)
            dispatch({
                type :ALL_PRODUCT_SUCCESS,
                payload : data
            })

    }catch(Error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: Error.response.data.error,
        })

    }
}

//GetProductDetails 

export const getProductDetails = (id)=>async(dispatch)=> {
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST})
            const {data} = await axios.get(`/api/v1/product/${id}`)

            dispatch({
                type :PRODUCT_DETAILS_SUCCESS,
                payload : data.product
            })

    }
    catch(Error){
        dispatch(
            {type: PRODUCT_DETAILS_FAIL,
             payload :
            Error.response.data.error })
    }
}

//  NEW REVIEW

export const newReview = (reviewData)=>async(dispatch)=> {


    try{
        dispatch({
            type:NEW_REVIEW_REQUEST})

            const config ={
                headers :{ "Content-Type" : "application/json"},
            }
            const {data} = await axios.put("/api/v1/review", reviewData, config)

            dispatch({
                type :NEW_REVIEW_SUCCESS,
                payload : data.success,
            })

    }
    catch(Error){
        dispatch(
            {type: NEW_REVIEW_FAIL,
             payload :
            Error.response.data.error })
    }
}

//GetProduct List -- Admin

export const getProductList= ()=>async(dispatch)=> {
    try{
        dispatch({
            type:PRODUCT_LIST_REQUEST})
            const {data} = await axios.get(`/api/v1/admin/products`)

            dispatch({
                type :PRODUCT_LIST_SUCCESS,
                payload : data
            })

    }
    catch(Error){
        dispatch(
            {type: PRODUCT_LIST_FAIL,
             payload :
            Error.response.data.error })
    }
}


//  CREATE NEW PRODUCT

export const createProduct = (reviewData)=>async(dispatch)=> {
    

    try{
        dispatch({
            type:NEW_PRODUCT_REQUEST})

            const config ={
                headers :{ "Content-Type" : "application/json"},
            }
            const {data} = await axios.post("/api/v1/admin/product/new", reviewData, config)

            dispatch({
                type :NEW_PRODUCT_SUCCESS,
                payload : data,
            })

    }
    catch(Error){
        dispatch(
            {type: NEW_PRODUCT_FAIL,
             payload :
            Error.response.data.error })
    }
}



export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}

//  DELETE PRODUCT

export const deleteProduct = (id)=>async(dispatch)=> {
    

    try{
        dispatch({
            type:DELETE_PRODUCT_REQUEST})

            const {data} = await axios.delete(`/api/v1/admin/product/${id}`)

            dispatch({
                type :DELETE_PRODUCT_SUCCESS,
                payload : data.success ,
            })

    }
    catch(Error){
        dispatch(
            {type: DELETE_PRODUCT_FAIL,
             payload :
            Error.response.data.error })
    }
}


export const updateProduct = (id, productData)=>async(dispatch)=> {
    

    try{
        dispatch({
            type:UPDATE_PRODUCT_RESET})

            const config ={
                headers :{ "Content-Type" : "application/json"},
            }
            const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData , config)

            dispatch({
                type :UPDATE_PRODUCT_SUCCESS,
                payload : data.success ,
            })

    }
    catch(Error){
        dispatch(
            {type: UPDATE_PRODUCT_FAIL,
             payload :
            Error.response.data.error })
    }
}



// Get all Reviews of a product

export const getAllReviews = (id)=>async(dispatch)=> {
    try{
        dispatch({
            type:ALL_REVIEWS_REQUEST})

            const {data} = await axios.get(`/api/v1/reviews?id=${id}`)

            dispatch({
                type :ALL_REVIEWS_SUCCESS,
                payload : data.reviews,
            })

    }
    catch(Error){
        dispatch(
            {type: ALL_REVIEWS_FAIL,
             payload :
            Error.response.data.error })
    }
}

// Get all Reviews of a product

export const deleteReviews = (reviewId, productId)=>async(dispatch)=> {
      console.log("actionID",reviewId)
      console.log("action PID",productId)
    try{
        dispatch({
            type:DELETE_REVIEWS_REQUEST})

            const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)

            dispatch({
                type :DELETE_REVIEWS_SUCCESS,
                payload : data.success,
            })

    }
    catch(Error){
        dispatch(
            {type: DELETE_REVIEWS_FAIL,
             payload :
            Error.response.data.error })
    }
}



    // clearing Errors

    export const Clear_Errors=()=> async (dispatch) =>{
        dispatch({type : CLEAR_ERRORS})
    
    }
