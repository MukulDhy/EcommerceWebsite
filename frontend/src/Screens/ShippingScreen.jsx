import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/Shared/FormContainer";
import { ShippingAddressAction } from "../Reducers/actions/cartAction";

const ShippingScreen = ({history}) => {
  const dispatch = useDispatch();
  
  const {shippingAddress} = useSelector(state => state.cart)  

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandeler = (e) => {
    e.preventDefault();  
    dispatch(ShippingAddressAction({address,city,postalcode,country}))
    history.push(`/payment`)
  }

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandeler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postalcode"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            continue
          </Button>                
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
