import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { paymentMethodAction } from "../Reducers/actions/cartAction";

const PaymentScreen = ({history}) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentMethodAction(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              className="my-4"
              name="paymentMethod"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" disabled = {!paymentMethod}>
          Continue
        </Button>
      </Form>
    </>
  )
}

export default PaymentScreen
