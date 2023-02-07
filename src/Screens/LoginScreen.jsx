import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {login} from "../Reducers/actions/user/userAction";
import AlertDismissibleExample from "../components/Shared/message";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
import FormContainer from "../components/Shared/FormContainer";
// import e from "express";

const LoginScreen = ({location,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {loading,error ,userInfo}  = userLogin;
  
  useEffect( () => {
      if(userInfo){
          history.push(redirect);
      }
  },[history,userInfo,redirect]);

  const submintHandeler = (e) => {
    e.preventDefault();
    dispatch(login(email,password));
  }

  return (
    <>
      <FormContainer>
        <h1>Sing In</h1>    
        {error && <AlertDismissibleExample error={error} ></AlertDismissibleExample>}
        {loading && <SpinnerLoader></SpinnerLoader>}
        <Form onSubmit={submintHandeler} className = "my-3">
          <Form.Group controlId="email">
            <Form.Label>Email Adress :</Form.Label>
            <Form.Control
              type="email"
              className = "my-3"
              placeholder="enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className = "my-1">Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type = "submit" variant="primary" className = "my-3">Submit</Button>
        </Form>
        <Row>
            <Col>
                New Customer ?
                <Link to = {redirect ? `register?redirect=${redirect}` : `/register`}>Register</Link>
            </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
