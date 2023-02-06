import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <>
      <Card className="m-3 p-3 rounded">
        <Link to = {`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
            <Link to = {`/product/${product._id}`}>
                <Card.Title as ="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as = "div">
                    <Rating rating = {product.rating} numReviews = {product.numReviews}/>
            </Card.Text>
            <Card.Text as = "div">
                $&nbsp;{product.price}
            </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
