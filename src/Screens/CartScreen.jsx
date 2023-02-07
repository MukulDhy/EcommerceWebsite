import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeToCart } from "../Reducers/actions/cartAction";
import {
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import AlertDismissibleExample from "../components/Shared/message";
import { Link } from "react-router-dom";

const QuantityMearsure = ({ item }) => {
  // const ACTION = {
  //   INCREMENT: "INCREMENT",
  //   DECREMENT: "DECREMENT",
  // };
  // const qytReducerFunction = (state, action) => {
  //   switch (action.type) {
  //     case ACTION.INCREMENT:
  //       const item = action.payload;
  //       if (item.countInStock >= item.qyt) {
  //         item.qyt = item.qyt + 1;
  //         return { ...state, qyt: state.qyt - 1 };
  //       }

  //     case ACTION.DECREMENT:
  //       return {
  //         ...state,
  //         qyt: state.qyt - 1,
  //       };
  //     default:
  //       return {
  //         state,
  //       };
  //   }
  // };
  // function DecrementQyt(cartItems){
  //   setQyt(qyt-1);
  //   console.log(qyt);
  //   // item.countInStock = item.countInStock+1;
  // }
  // const IncreaseQyt = (item) => {
  //   if(item.countInStock-1){
  //     item.countInStock = item.countInStock -1;
  //       setQyt(qyt+1)
  //   }
  // }
  // const [state, dispatch] = useReducer(qytReducerFunction, { qyt: item.qyt });

  const [qyt, setQyt] = useState(item.qyt);
  function DecrementQyt() {
    if (qyt -1) {
      setQyt(qyt - 1);
      item.countInStock = item.countInStock + 1;
    }else{
      dispatch(removeToCart(item.product));
    }
  }
  const IncreaseQyt = () => {
    if (item.countInStock - item.qyt - 1) {
      item.countInStock = item.countInStock - 1;
      setQyt(qyt + 1);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToCart(item.product, qyt));
  }, [dispatch, item.product, qyt]);

  return (
    <>
      <Button
        className="w-20 btn-block rounded text-capitalize"
        type="button"
        onClick={DecrementQyt}
      >
        -
      </Button>
      <Button
        className="w-50 m-2 btn-block rounded text-capitalize"
        type="button"
      >
        {qyt}
      </Button>
      <Button
        className="w-20 btn-block rounded text-capitalize"
        type="button"
        onClick={IncreaseQyt}
      >
        +
      </Button>
    </>
  );
};

const CartScreen = ({ match, location, history }) => {
  const qyt = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems[0].name);

  // function DecrementQyt(cartItems){
  //   setQyt(qyt-1);
  //   console.log(qyt);
  //   // item.countInStock = item.countInStock+1;
  // }
  // const IncreaseQyt = (item) => {
  //   if(item.countInStock-1){
  //     item.countInStock = item.countInStock -1;
  //       setQyt(qyt+1)
  //   }
  // }
  //

  useEffect(() => {
    if (match.params.id) {
      dispatch(addToCart(match.params.id, qyt));
    }
  }, [dispatch, match.params.id, qyt]);

  const checkOutHandeler = () => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <>
              <AlertDismissibleExample
                error={"Your Cart is Empty"}
              ></AlertDismissibleExample>
              <Link to="/">Lets Do Shopping </Link>
            </>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={5}>
                      <ListGroupItem className="text-center p-2">
                        <QuantityMearsure item={item}></QuantityMearsure>
                      </ListGroupItem>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <h2>Total Price : </h2>
            <ListGroupItem>
              <Row style={{ fontWeight: "bolder", fontSize: "18px" }}>
                <Col md={5}>Product Name</Col>
                <Col md={3} style={{ margin: "auto", textAlign: "center" }}>
                  Quantity
                </Col>
                <Col md={3} style={{ margin: "auto", textAlign: "center" }}>
                  Price
                </Col>
              </Row>
            </ListGroupItem>
            {cartItems ? (
              cartItems.map((item) => {
                return (
                  <ListGroupItem>
                    <Row>
                      <Col md={6}>{item.name}</Col>
                      <Col md={3}>{item.qyt}</Col>
                      <Col md={3}>${item.price * item.qyt}</Col>
                    </Row>
                  </ListGroupItem>
                );
              })
            ) : (
              <ListGroupItem>
                <strong>No Product in Cart</strong>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Row>
                <Col md={6}>Total :</Col>
                <Col md={3}>
                  {cartItems.reduce((acc, item) => acc + item.qyt, 0)}
                </Col>
                <Col md={3}>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.qyt * item.price,
                    0
                  )}
                </Col>
              </Row>
            </ListGroupItem>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              rounded
              onClick={checkOutHandeler}
            >
              {" "}
              Proceed To CheckOut
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
