import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../../images/logo.png";
import { useState } from 'react';
import {useHistory} from 'react-router'
import "./Header.css"


const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>


const Header = () => {

  const history = useHistory()
  const[keyword, setKeyword] = useState("")

    const inputHandler=(e)=>{
        e.preventDefault();
        var lowerCase = e.target.value.toLowerCase();
        setKeyword(lowerCase);

        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }else{
            history.push("/products")
        }
    }
    return (
        <div className="nav">

            <div id="logo">
               
             <Link to="/">
                  <img className="logoImage" src={logo} alt="Not" /> 
             </Link>
             </div>

             <Link  className="navlinks" to="/">Home</Link>
           <Link   className="navlinks"  to="/products">Products</Link>
           <Link   className="navlinks" to="/contact">Contact</Link>
           <Link   className="navlinks" to="/about">About</Link>
           <Link   className="navlinks" to="/cart">Cart</Link>
        

           <div className="searchbox">
        
            <input 
            type="text"
            placeholder="Search a Product ... "
            onChange={inputHandler}
             />
                {searchIcon}

            </div>
       

          </div>
            

         
    )
}

export default Header