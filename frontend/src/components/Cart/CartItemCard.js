import React from 'react'
import { Link } from 'react-router-dom'
import "./CartItemCard.css"

const CartItemCard =({item, deleteCartItems}) =>{
  return (
    <div className="CartItemCard">
        <img src={item.images} alt="cartItem" />
        <div>
            <Link to={`/product/${item.product}`}></Link>
            <span>{`Price : ₹${item.price}`}</span>
            <p onClick={()=>deleteCartItems(item.product)}>remove</p>
        </div>

    </div>
  )
}

export default CartItemCard