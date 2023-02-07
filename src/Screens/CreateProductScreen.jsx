import React, { useEffect, useState } from "react";
// import {Link} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import {register} from "../Reducers/actions/user/userAction";
import AlertDismissibleExample from "../components/Shared/message";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
// import FormContainer from "../components/Shared/FormContainer";
import { createProductAction } from "../Reducers/actions/productActions";
// import e from "express";

const CreateProductScreen = ({location,history}) => {
  const [name,setname] = useState('');
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [countInStock, setcountInStock] = useState("");
  const [message,setMessage] = useState('');

//   const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin  = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
  const {loading,product,error} = useSelector((state) => state.createProduct);
  
  var success = 0;
  useEffect( () => {
      if(product){
        setMessage("Congraculation register Successfully");
        history.push(`/product/${product._id}`);
      }
    // if(password !== brand){
    //     setMessage("Password and confirm Password is Not Matched");
    // }else{
    //     setMessage('');
    // }
    if(userInfo){
      if(!userInfo.isAdmin){
          history.push(`/`);
        }
      }else{      
        history.push(`/`);
    }


  },[history,product,message,setMessage]);

  const submintHandeler = (e) => {
    e.preventDefault();
    dispatch(createProductAction({name,image,description,brand,category,price,countInStock}));
  }

  return (
    <>
      {/* <FormContainer> */}
        <h1>Create New Product</h1>    
        {error && <AlertDismissibleExample error={error} ></AlertDismissibleExample>}
        {loading && <SpinnerLoader></SpinnerLoader>}
        {message && <AlertDismissibleExample error={message}></AlertDismissibleExample>}
        {message && success && <AlertDismissibleExample error={message} success = {1}></AlertDismissibleExample>}
        <Form onSubmit={submintHandeler} className = "justify-content-left">
          <Form.Group controlId="name" className="my-2">
            <Form.Label>name : </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your name"
              value={name}
              required
              onChange={(e) => setname(e.target.value)}
            ></Form.Control>
           </Form.Group>
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image :</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter image address"
              required
              value={image}
              onChange={(e) => setimage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Product description :</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter description"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              required
              value={brand}
              onChange={(e) => setbrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Category" className="my-2">
            <Form.Label>Category :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category name"
              required
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>price :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              required
              value={price}
              onChange={(e) => setprice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>countInStock :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              required
              value={countInStock}
              onChange={(e) => setcountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type = "submit" variant="primary" classname = "my-3">Submit</Button>
        </Form>
      {/* </FormContainer> */}
    </>
  );
};

export default CreateProductScreen;
