import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from './Product'
import MetaData from '../Layout/MetaData'
import{getProduct, clearErrors} from '../../actions/productAction'
import{ useSelector,useDispatch}  from "react-redux"
import { useEffect } from 'react'
import Loader from "../Layout/Loader/Loader.js"
import {useAlert} from "react-alert"

function Home() {
    const alert = useAlert()

    const dispatch = useDispatch();
    const {loading, error, product,} = useSelector((state) => state.products
        )

      
    useEffect(() => {
        
        if (error) {
          alert.error(error)
          dispatch(clearErrors());
        }
        dispatch(getProduct());
      }, [dispatch, error, alert]);

      window.addEventListener("contextmenu", (e)=> e.preventDefault())
  return (
      <Fragment>
          
          {loading ? <Loader />:
              <Fragment>
              <MetaData title="Ecommerce" />
              <div className="banner">
                  <p>Welcome to Ecommerce</p>
                  <h1>FIND AMAZING PRODUCTS BELOW</h1>
      
                  <Link to="#">
                  <button className="social_buttons">
                      Scroll <CgMouse />
                  </button>
                  </Link>
      
              </div>
              <h2 className="homeHeading">
                  Features Product
              </h2>
              <div className="container" id="container">
                  {product && product.map((product)=> <Product product={product} />)}
                  
              </div>
          </Fragment>}
      </Fragment>

  )
}

export default Home