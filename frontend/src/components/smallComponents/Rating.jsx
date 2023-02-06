import React from 'react'


const totalRating = (rating) => {
    let data = [];
    while(rating > 0){
      if(rating < 1){
        data[Math.floor(rating)] = <i className="fa-solid fa-star-half-stroke"></i>;
        break;
      }
      data[Math.floor(rating)] = <i className="fa-solid fa-star"></i> 
      rating--;
    }
    return data;
}
const Rating = ({rating,numReviews}) => {
  return (
    <div className='rating'>
        {
            totalRating(rating).reverse().map((currIdx,i) => (<span style={{"color":"red"}} key={i}>{currIdx}</span>))         
        }     
      <span>&nbsp; {numReviews} reviews</span>
    </div>
  )
}

export default Rating
