import React from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Layout/Loader/Loader'
import Product from '../Home/Product.js'
import { useEffect } from 'react'
import { getProduct } from '../../actions/productAction'
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography"
import "./Products.css"
import { useState } from 'react'

const categories = [
    "Laptop",
    "Electronic",
    "Footware",
    "Shirts",
    "Kitchen",
    "Decoration",
    "Camera",
    "Smartphones"
]

function Products({match}) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 90000]);
    const [category, setCategory] = useState("");
    const [ratings, setRating] = useState(0)
    const {loading, product, productsCount, resultPerPage, filteredProductCount} = useSelector((state) => state.products
        )

    const keyword = match.params.keyword;

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice)=>{
      
        setPrice(newPrice)

    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
      }, [dispatch, keyword, currentPage, price, category, ratings]);

  let count = filteredProductCount;


  return (
    <Fragment>
        {loading? <Loader /> : 
        <Fragment>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {product && 
                product.map((product)=><Product key={product._id} product={product} />)}
            </div>

             {/* Fillter  */}

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={90000} />
      


            {/* Category */}
                <Typography>
                    Categories
                </Typography>
                <ul className="categoryBox">
                    {categories.map((category)=>(
                        <li 
                        className="category-link" 
                        key={category}
                        onClick={()=> setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                    
                </ul>


                {/* Ratings */}
                <Typography component="legend">Rating Above</Typography>
                <Slider 
                    value={ratings}
                    onChange={(e, newRating)=>{
                        setRating(newRating)
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    
                    />

            </div>

            {/*  Pagination */}

            {resultPerPage < count && 
            <div className="paginationBox">
            <Pagination
               activePage={currentPage}
               itemsCountPerPage={resultPerPage}
               totalItemsCount={productsCount}
               onChange={setCurrentPageNo}
               nextPageText="Next"
               prevPageText="Prev"
               firstPageText="1st"
               lastPageText="Last"
               itemClass="page-item"
               linkClass="page-link"
               activeClass="pageItemActive"
               activeLinkClass="pageLinkActive"
             />
        </div>
            
            }
        </Fragment>}

    </Fragment>
  )
}

export default Products