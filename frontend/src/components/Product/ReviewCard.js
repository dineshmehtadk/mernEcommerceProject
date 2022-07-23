import React from 'react'
import ReactStars from 'react-rating-stars-component'


function ReviewCard({review}) {
    const options = {
        edit :false,
        color : "rgba(20, 20, 20, 0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ?11 :16,
        value : review.rating,
        isHalf : true
    }
  return (
    <div className="reviewCard">
        <img src="" alt="user" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
        </div>
  )
}

export default ReviewCard