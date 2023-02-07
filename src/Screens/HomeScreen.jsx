import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/smallComponents/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { productActionList } from "../Reducers/actions/productActions";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
import "./Screen.css";
import AlertDismissibleExample from "../components/Shared/message";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.ProductList);
  const { loading, Products, error,status } = ProductList;
  useEffect(() => {
    dispatch(productActionList());
  }, [dispatch]);
  console.log(error)

  return (
    <>
      <div className="homeScreen">
        {loading ? (
          <SpinnerLoader></SpinnerLoader>
        ) : error ? (
          <AlertDismissibleExample error={error} status = {status}/>
        ) : (
          <Row>
            {Products.map((product, i) => {
              return (
                <Col key={i} md={3}>
                  <ProductCard product={product}></ProductCard>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
