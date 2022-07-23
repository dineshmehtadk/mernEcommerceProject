import React from 'react'
import { useEffect } from 'react';
import { Fragment } from 'react'
import Carosel from "react-material-ui-carousel"
import ReactStars from 'react-rating-stars-component';
import {useDispatch, useSelector} from "react-redux"
import {getProductDetails, newReview} from "../../actions/productAction"
import "./ProductDetails.css"
import ReviewCard from './ReviewCard';
import {useAlert} from "react-alert"
import Loader from '../Layout/Loader/Loader';
import { useState } from 'react';
import { addItemsCart } from '../../actions/cartAction';
import { Rating } from "@material-ui/lab";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,

} from "@material-ui/core"
import { Clear_Errors } from '../../actions/orderAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstant';


const ProductDetails =({match})=> {
    const alert = useAlert()
    const dispatch = useDispatch();
    const [quantity, setQuantiy] = useState(1)
    const [rating, setRating] =useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false)

    const {product,error, loading} = useSelector((state) => state.productDetails
    )

    const {success, error:reviewError} = useSelector((state)=>state.newReview)

    const increaseQuantity = ()=>{
        
        if(product.stock <= quantity) return
            const qty = quantity + 1  
        setQuantiy(qty)
           
    }

    const decreaseQuantity = ()=>{
        if(quantity <=1) return
            const qty = quantity - 1  
        setQuantiy(qty)
        
    }


    const addToCartHandler=() =>{
        dispatch(addItemsCart(match.params.id, quantity))
        alert.success("ITEM ADDED TO CART")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    const reviewSubmitHandler = ()=>{
        const myForm = new FormData();
        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", match.params.id)
        
        dispatch(newReview(myForm))
        setOpen(false)
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(reviewError){
            alert.error(reviewError)
            dispatch(Clear_Errors())
        }
        if(success){
            alert.success("Review Submitted successfully");
            dispatch({type : NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id))
    },[dispatch, match.params.id, alert, error, success, reviewError])

    const options = {
        edit :false,
        color : "rgba(20, 20, 20, 0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ?11 :16,
        value : product.ratings,
        isHalf : true
    }
  return (
    <Fragment>{loading ? <Loader />: <Fragment>
        <div className="ProductDetails">
            <div>
        
                 <Carosel>
                    {product.images &&
                    product.images.map((item, i)=>(
                        <img 
                            className="caroselImage"
                            key ={i}
                            src = {item.url}
                            alt= {`${i}Slide`}
                        />
                    ))
                    }
                </Carosel> 
            </div>
            <div>
                <div className="detailBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div> 
                <div className="detailBlock-2">
                    <ReactStars {...options} /> 
                    <span>({product.numOfReview} Reviews)</span>
                </div>  
                <div className="detailBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly  type="number" value={quantity} />
                    <button  onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                  </div>
                      <p>
                          Status:{" "}
                          <b className={product.stock < 1 ? "redColor": "greenColor"}>
                              {product.stock < 1? "Out of Stock" : "In Stock"}
                          </b>
                      </p>
                  </div>  
                <div className="detailBlock-4">
                    Description :<p>{product.description}</p>
                    </div>
                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>

            </div>

        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}  color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

        {product.review && product.review[0] ? (
            <div>
            {product.review && 
            product.review.map((review)=> <ReviewCard key={review.name} review={review} />)}
        </div>

        ): (
            <p className="noReviews">No Reviews</p>
        )}
        
    </Fragment>}
     </Fragment>
    
  )
}

export default ProductDetails