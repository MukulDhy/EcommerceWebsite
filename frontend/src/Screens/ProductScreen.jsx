import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
// import products from "../products";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { SingleProductAction } from "../Reducers/actions/singleProductAction";
import Rating from "../components/smallComponents/Rating";
import AlertDismissibleExample from '../../src/components/Shared/message'
import { useState } from "react";

// const ShowQyantityBar = ({qyt}) => {
//     console.log(qyt);
//     return(
//       <ListGroupItem className="text-center">
//         <Button className="w-25 btn-block rounded text-capitalize" type="button" onClick={setInc(inc+1)}>+</Button>
//         <Button className="w-25 btn-block rounded text-capitalize" type="button">{qyt}</Button>
//         <Button className="w-25 btn-block rounded text-capitalize" type="button"onClick={setDec(dec-1)}>-</Button>
//       </ListGroupItem>
//     )
// }

const ProductScreen = ({ history,match }) => {

  const [qyt,setQyt] = useState(0);

  const addToCartHandeler = () => {
    if(!qyt){
      if(SingleProduct.countInStock){
        setQyt(qyt+1);
        SingleProduct.countInStock = SingleProduct.countInStock -1;
      }
    }else{
      if(SingleProduct.countInStock){
        history.push(`/cart/${match.params.id}?qyt=${qyt}`);
      }
    }
  }
  const DecrementQyt = () => {
    setQyt(qyt-1)
    SingleProduct.countInStock = SingleProduct.countInStock+1;
  }
  const IncreaseQyt = () => {
    if(SingleProduct.countInStock-1){
      SingleProduct.countInStock = SingleProduct.countInStock -1;
        setQyt(qyt+1)
    }
  }


  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.Product);
  const { loading, Product, error, status } = getProduct;
  const SingleProduct = Product;
  useEffect(() => {
    dispatch(SingleProductAction(match.params.id));
  }, [dispatch]);

  return (
    <div className="my-5">
      {
        loading ? (
          <SpinnerLoader></SpinnerLoader>
        ) : error ? (
          <AlertDismissibleExample error={error} status = {status}/>
        ) : (
      <Row>
        <Col md={6}>
          <Image src={SingleProduct.image} alt={SingleProduct.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{SingleProduct.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                rating={SingleProduct.rating}
                numReviews={SingleProduct.numReviews}
              />
            </ListGroupItem>
            <ListGroupItem>
              <p>
                Price : <strong>${SingleProduct.price}</strong>
              </p>
            </ListGroupItem>
            <ListGroupItem>{SingleProduct.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
                {SingleProduct.countInStock > 0 ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>InStock</p>
                ) : (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Out of Stock
                  </p>
                )}
              </Col>
            </Row>
          </ListGroupItem>
          {
            (SingleProduct.countInStock > 0 && qyt> 0) && (
              <ListGroupItem className="text-center p-2">
                <Button className="w-20 btn-block rounded text-capitalize" type="button" onClick = {DecrementQyt} >-</Button>
                <Button className="w-50 m-2 btn-block rounded text-capitalize" type="button">{qyt}</Button>
                <Button className="w-20 btn-block rounded text-capitalize" type="button" onClick = {IncreaseQyt} >+</Button>
              </ListGroupItem>
            )
          }
          <ListGroupItem className="text-center p-2">
            <Button
              className="w-100 btn-block rounded text-capitalize"
              type="button" onClick={addToCartHandeler}
            >
              Add to Cart
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
        ) 
      }

    </div>
  );
};

export default ProductScreen;
