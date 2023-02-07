import React from "react";
import { Navbar, Form, Button, Nav, Container, NavDropdown } from "react-bootstrap";
import obj from "../name";
import { LinkContainer } from "react-router-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const isLogin = 0;
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../Reducers/actions/user/userAction";
import SpinnerLoader from "./smallComponents/SpinnerLoader";

const Header = ({history}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo,loading } = userLogin;
  // useEffect(() => {

  // }, [dispatch])

  const logOutHandeler =() => {
    dispatch(logOut());
  }
  return (
    <>
      <Navbar
        className="p-2"
        bg="dark"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>{obj.name}</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Link">
                <Nav.Link>Link</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="me-3">
                  {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
                  Cart &nbsp;<i className="fa-solid fa-cart-shopping"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>

            <Form className="d-flex">
              {loading && <SpinnerLoader></SpinnerLoader>}
              {userInfo ? (
                <Nav className="ml-auto">
                   <Nav.Link >
                      <NavDropdown title = {userInfo.name} id = "username">
                          <LinkContainer to = '/profile'>
                            <NavDropdown.Item>
                                <Button variant="primary" className="w-100">Profile</Button>
                            </NavDropdown.Item>
                          </LinkContainer>
                            <NavDropdown.Item onClick={logOutHandeler}>
                                <Button variant="danger" className="w-100">Log Out</Button>
                            </NavDropdown.Item>
                      </NavDropdown>
                   </Nav.Link>
                 </Nav>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Button variant="outline-danger m-2">Sign Up</Button>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Button variant="outline-success m-2">Login</Button>
                  </LinkContainer>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
