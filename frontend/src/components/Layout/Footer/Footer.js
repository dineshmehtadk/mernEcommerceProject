
import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from  "../../../images/Appstore.png"
import { Link } from 'react-router-dom';
import "./Footer.css"


function Footer() {
  return (
    <footer>

        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for Android and IOS mobile phone </p>
            <img src={playStore}  alt="playstore" />
            <img src={appStore}  alt="appstore" />

        </div>
        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High quanlity is our first priority</p>
            <p>Copyrights 2022 &copy; Dkmehta </p>

        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <Link to="#">Instagram</Link>
            <Link to="#">Twitter</Link>
            <Link to="#">Youtuve</Link>
           

        </div>

    </footer>
  )
}

export default Footer