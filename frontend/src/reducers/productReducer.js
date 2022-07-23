import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEWS_REQUEST,
    DELETE_REVIEWS_SUCCESS,
    DELETE_REVIEWS_RESET,
    DELETE_REVIEWS_FAIL,

} from "../constants/productConstant"

export const productReducer = (state ={products:[]},
    action) =>{
        switch(action.type){
            case ALL_PRODUCT_REQUEST:
            case  PRODUCT_LIST_REQUEST:
            return{
                loading: true ,
                product:[]
            }
            case ALL_PRODUCT_SUCCESS:
                return{
                    loading : false,
                    product : action.payload.products,
                    productsCount : action.payload.productsCount,
                    resultPerPage : action.payload.resultPerPage,
                    filteredProductCount : action.payload.filteredProductCount,
                }
            case PRODUCT_LIST_SUCCESS:
                return{
                    products : action.payload.products,
                    numOfProducts :action.payload.numOfProducts,
                }
            case PRODUCT_LIST_FAIL:    
            case ALL_PRODUCT_FAIL:
                return{
                    loading:false,
                    error : action.payload,
                
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}

export const productDetailsReducer = (state ={product:{}},
    action) =>{
        switch(action.type){
            case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case PRODUCT_DETAILS_SUCCESS:
                return{
                    loading : false,
                    product : action.payload,
                    
                }
            case PRODUCT_DETAILS_FAIL:
                return{
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}

export const newReviewReducer = (state={},
    action) =>{
        switch(action.type){
            case NEW_REVIEW_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case NEW_REVIEW_SUCCESS:
                return{
                    loading : false,
                    succes : action.payload,
                    
                }
                
            case NEW_REVIEW_RESET:
            return{
                ...state,
                succes : false,
                
            }
            case NEW_REVIEW_FAIL:
                return{
                    ...state,
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}

export const newProductReducer = (state={},
    action) =>{
        switch(action.type){
            case NEW_PRODUCT_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case NEW_PRODUCT_SUCCESS:
                return{
                    loading : false,
                    success: action.payload.success,
                    product: action.payload.product,
                    
                }
                
            case NEW_PRODUCT_RESET:
            return{
                ...state,
                success : false,
                
            }
            case NEW_PRODUCT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}

export const deleteProductReducer = (state={},
    action) =>{
        switch(action.type){
            case UPDATE_PRODUCT_REQUEST:
            case DELETE_PRODUCT_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case DELETE_PRODUCT_SUCCESS:
                return{
                    ...state,
                    loading : false,
                    isDeleted : action.payload
                    
                }
                case UPDATE_PRODUCT_SUCCESS:
                    return{
                        ...state,
                        loading : false,
                        isUpdated : action.payload
                        
                    }
            case UPDATE_PRODUCT_RESET: 
            return{
                ...state,
                isUpdated : false,
                
            }
            case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted : false,
                
            }
            case UPDATE_PRODUCT_FAIL:
            case DELETE_PRODUCT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}


export const productReviewsReducer = (state ={reviews:[]},
    action) =>{
        switch(action.type){
            case ALL_REVIEWS_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case ALL_REVIEWS_SUCCESS:
                return{
                    loading : false,
                    reviews : action.payload,
                    
                }
            case ALL_REVIEWS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}



export const reviewReducer = (state={},
    action) =>{
        switch(action.type){
            case DELETE_REVIEWS_REQUEST:
            return{
                loading: true ,
                ...state
            }
            case DELETE_REVIEWS_SUCCESS:
                return{
                    loading : false,
                    isDeleted : action.payload,
                    
                }
                
            case DELETE_REVIEWS_RESET:
            return{
                ...state,
                isDeleted : false,
                
            }
            case DELETE_REVIEWS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error : action.payload 
                }
            
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
            default:
                return state;
        }
}