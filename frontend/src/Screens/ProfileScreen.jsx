import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  userDetailAction,
  userUpdateDetailAction,
} from "../Reducers/actions/user/userAction";
import AlertDismissibleExample from "../components/Shared/message";
import SpinnerLoader from "../components/smallComponents/SpinnerLoader";
import FormContainer from "../components/Shared/FormContainer";

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, user, error } = userDetail;
  const { userInfo } = useSelector((state) => state.userLogin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login`);
    } else {
      if (!user.name) {
        dispatch(userDetailAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, userInfo]);
  const [success, setSuccess] = useState("");
  const submintHandeler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(userUpdateDetailAction(name, email, password));
      setMessage("");
      setSuccess(true);
      setUpdate("");
      dispatch(userDetailAction());
      setName(user.name);
      setEmail(user.email);
    } else {
      setSuccess(false);
      setMessage("Password and confirm Password is Not Matched");
    }
  };

  return (
    <>
      <FormContainer>
        <h1>User Profile</h1>
        {error && (
          <AlertDismissibleExample error={error}></AlertDismissibleExample>
        )}
        {loading && <SpinnerLoader></SpinnerLoader>}
        {message && (
          <AlertDismissibleExample error={message}></AlertDismissibleExample>
        )}
        {success && (
          <AlertDismissibleExample
            error={"Congratulations profile is updated Successfully"}
            success={success}
          ></AlertDismissibleExample>
        )}
        <Form onSubmit={submintHandeler} className="my-3">
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name : </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter Your Name"
              value={name}
              disabled={!update}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Adress :</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email address"
              value={email}
              disabled={!update}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {update && (
            <>
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
            </>
          )}
          <Button
            variant={update ? "danger" : "primary"}
            className="my-3"
            onClick={() => setUpdate(!update)}
          >
            {" "}
            Update Profile
          </Button>
          {update && (
            <Button type="submit" variant="primary" className="mx-3">
              Submit
            </Button>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileScreen;
