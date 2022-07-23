
import React from 'react';
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";

import "./OrderSuccess.css"


const OrderSuccess = () => {

  localStorage.setItem("cartItems",[])
  
  return (
    <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography> Your Order has been Successfully placed </Typography>
        <Link to="/orders">View Order</Link>
    </div>
  )
}

export default OrderSuccess