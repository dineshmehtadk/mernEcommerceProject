import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, deleteProduct, getProductList } from '../../actions/productAction';
import {useAlert} from "react-alert"
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import {DataGrid} from "@material-ui/data-grid"
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import  "./ProductList.css"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';
const ProductList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert()
    const {products, error} = useSelector((state)=> state.products)
    const {error: deleteError, isDeleted, } = useSelector((state)=> state.deleteProduct)

    const deleteProductHandler=(id)=>{
      dispatch(deleteProduct(id))

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
        alert.success("PRODUCT DELETED SUCCESSFULLY");
        history.push("/admin/dashboard")

        dispatch({type : DELETE_PRODUCT_RESET})
      }

      dispatch(getProductList())
    },[dispatch, error, isDeleted,alert, history, deleteError])
   
    const columns = [
      {field:"id", headerName:"Product ID", minwidth : 200, flex : 0.5},

      {field:"name", headerName:"Name", minwidth : 350, flex : 1},
      {field:"stock", headerName:"Stock", minwidth : 150, flex : 0.5},
      {field:"price", headerName:"Price", minwidth : 270, flex : 0.3},
      {field:"name", headerName:"Name", minwidth : 350, flex : 1},
      {field:"actions",
      headerName:"Actions",
      minwidth : 150,
      flex : 0.3,
      type : "number",
      sortable : false,
      renderCell : (params)=>{
        return(
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
            <EditIcon />
            </Link>
            <Button>
              <DeleteIcon onClick={() =>deleteProductHandler(params.id, "id")}  />
            </Button>
          </Fragment>
        )
        }
      }
    ]

    const rows = []

    products && products.forEach((item)=>{
      rows.push({
        id : item._id,
        stock : item.stock,
        price : item.price,
        name : item.name
      })
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductList())

    },[alert, error, dispatch])
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
    <div className="dashboard">
      
    <Sidebar />

    <div className="productListContainer">

      <h1 id="productListHeading">ALL PRODUCTS</h1>
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


export default ProductList