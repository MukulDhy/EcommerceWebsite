import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ob from "../name";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <span>CopyRight &copy; {ob.name}</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
