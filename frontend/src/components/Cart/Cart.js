import React from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsCart, removeItemsFromCart } from '../../actions/cartAction'
import "./Cart.css"
import CartItemCard from "./CartItemCard";
import { Link } from 'react-router-dom';
import {Typography} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import Loader from '../Layout/Loader/Loader'


function Cart({history}) {
    const dispatch = useDispatch()
    const {cartItems, loading} = useSelector((state)=> state.cart)
    



    const increaseQuantity =(id, quantity, stock)=>{

        const netQty = quantity + 1
        if(stock <= quantity) return

        dispatch(addItemsCart(id, netQty))

    }
    const decreaseQuantity =(id, quantity)=>{
        const netQty = quantity - 1;
        if(quantity <= 1) return
        dispatch(addItemsCart(id, netQty))
    }

    const deleteCartItems=(id)=>{
        dispatch(removeItemsFromCart(id))
    }
    const checkoutHandler=()=>{
        history.push("login?redirect=shipping")
    }
    
  return (
      <Fragment>
          {loading ? <Loader /> : <Fragment>
          {cartItems.length ===0 ?(
              <div className="emptyCart">
                  <RemoveShoppingCartIcon />
                  <Typography>No Product in our cart.</Typography>
                  <Link to="products">View Products</Link>
              </div>
          ):(
            <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                {cartItems && cartItems.map((item) =>(
                    <div className="cartContainer">
                    <CartItemCard key={item.product} item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                        <button onClick={()=> decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={()=>increaseQuantity(item.product, item.quantity)}>+</button>
                    </div>
                    <p className="cartSubtotal">₹{item.price * item.quantity}</p>
                    
                </div>
                ))}
                 <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler} >Check Out</button>
              </div>
            </div>
    
            </div>
        </Fragment>

          )}
      </Fragment>
    }
      </Fragment>
      
  )
}

export default Cart