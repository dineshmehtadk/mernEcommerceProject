import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { getOrderDetails } from '../../actions/orderAction';
import { Fragment } from 'react';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = ({ match }) => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  console.log(order);

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order# {order && order._id}
              </Typography>
              <Typography>Shipping Info </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name : </p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone : </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address : </p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country},`}
                  </span>
                </div>
              </div>
            </div>
            <div className="orderDetailsContainer">
            
              <Typography>Payment</Typography>
              <div className="oderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }>
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>
                <div>
                  <p>Amount : </p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
            </div>
            <div className="orderDetailsContainer">
              <Typography>Order Status</Typography>
              <div className="oderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }>
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
          
                <div></div>
                <div className="orderDetailsCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.images} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                          {item.quantity} X ₹{item.price}={" "}
                            <b>₹{item.price * item.quantity}</b>

                           
                          </span>
                       
                        
                        </div>
                      ))}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
