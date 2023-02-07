import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header";
import CartScreen from "./Screens/CartScreen";
import CreateProductScreen from "./Screens/CreateProductScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import ProductScreen from "./Screens/ProductScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import ShippingScreen from "./Screens/ShippingScreen";

const App = () => {
  return (
      <Router>
        <Header></Header>
        <main className="my-3">
          <Container>
            
            <Route path = "/" component={HomeScreen} exact></Route>
            <Route path = "/login" component={LoginScreen} exact></Route>
            <Route path = "/register" component={RegistrationScreen} exact></Route>
            <Route path = "/product/:id" component={ProductScreen} exact></Route>
            <Route path = "/cart/:id?" component={CartScreen} exact></Route>
            <Route path = "/profile" component={ProfileScreen} exact></Route>
            <Route path = "/shipping" component={ShippingScreen} exact></Route>
            <Route path = "/payment" component={PaymentScreen} exact></Route>
            <Route path = "/placeorder" component={PlaceOrderScreen} exact></Route>
            <Route path = "/createProduct" component={CreateProductScreen} exact></Route>
            
          </Container>
        </main>
        <Footer></Footer>
      </Router>
  );
};

export default App;
