import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {register} from "../Reducers/actions/user/userAction";
import AlertDismissibleExample from "../components/Shared/message";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
import FormContainer from "../components/Shared/FormContainer";
// import e from "express";

const RegistratinScreen = ({location,history}) => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message,setMessage] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin  = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  const {loading,error}  = userRegister;
  
  var success = 0;
  useEffect( () => {
      if(userInfo){
        setMessage("Congraculation register Successfully");
        success = 1
        history.push(redirect);
      }
    if(password !== confirmPassword){
        setMessage("Password and confirm Password is Not Matched");
    }else{
        setMessage('');
    }
  },[history,userInfo,redirect,password,confirmPassword,message,setMessage]);

  const submintHandeler = (e) => {
    e.preventDefault();
    if(password === confirmPassword){
        dispatch(register(name,email,password));
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Register User</h1>    
        {error && <AlertDismissibleExample error={error} ></AlertDismissibleExample>}
        {loading && <SpinnerLoader></SpinnerLoader>}
        {message && <AlertDismissibleExample error={message}></AlertDismissibleExample>}
        {message && success && <AlertDismissibleExample error={message} success = {1}></AlertDismissibleExample>}
        <Form onSubmit={submintHandeler} className = "my-3">
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name : </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
           </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Adress :</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Confirmpassword" className="my-2">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="reEnter password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type = "submit" variant="primary" className = "my-3">Submit</Button>
        </Form>
        <Row>
            <Col>
               Have an Account ?
                <Link to = {redirect ? `login?redirect=${redirect}` : `/login`}>Login</Link>
            </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegistratinScreen;
