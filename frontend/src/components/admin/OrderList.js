import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Clear_Errors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { clearErrors, getProductList } from '../../actions/productAction';
import {useAlert} from "react-alert"
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import {DataGrid} from "@material-ui/data-grid"
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./OrderList.css"


import { DELETE_ORDERS_RESET } from '../../constants/orderConstant';
const OrderList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert()
    const {orders, error} = useSelector((state)=> state.allOrders)
    const {error : deleteError, isDeleted, } = useSelector((state)=> state.deleteProduct)

    const deleteOrderHandler=(id)=>{
      
      dispatch(deleteOrder(id))

    }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors)
      }
      if(deleteError){
        alert.error(deleteError);
        dispatch(clearErrors)
      }

      if(isDeleted){
        alert.success("ORDER DELETED SUCCESSFULLY");
        history.push("/admin/orders")

        dispatch({type : DELETE_ORDERS_RESET})
      }
      dispatch(getAllOrders())
    },[dispatch, alert, deleteError, history, isDeleted, error  ])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 270, flex: 0.8 },

        {
          field: "status",
          headerName: "Status",
          minWidth: 120,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 120,
          flex: 0.5 ,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 150,
          flex: 0.5,
        },
    
      {field:"actions",
      headerName:"Actions",
      minwidth : 150,
      flex : 0.4,
      type : "number",
      sortable : false,
      renderCell : (params)=>{
        return(
            <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
            <EditIcon />
            </Link>
            <Button>
              <DeleteIcon onClick={() =>deleteOrderHandler(params.id, "id")}  />
            </Button>
       
          </Fragment>
        )
        }
      }
    ]

    const rows = []

    orders && orders.forEach((item)=>{
  
      rows.push({
        id : item._id,
        itemsQty : item.orderItems[0].quantity,
        status : item.orderStatus,
        amount : item.totalPrice
      })
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(Clear_Errors())
        }
        dispatch(getProductList())

    },[alert, error, dispatch])
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
    <div className="dashboard">
      
    <Sidebar />

    <div className="productListContainer">

      <h1 id="productListHeading">ALL ORDERS</h1>
      <DataGrid 
        rows ={rows} 
        columns = {columns}
        pageSize ={10}
        disableSelectionOnClick
        className="productListTable"
      />


    </div>

    </div>
    </Fragment>
  )
}


export default OrderList;