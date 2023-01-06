import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/esm/Row";

import axios from "../api/axios";

import useAuth from "../hooks/useAuth";
import Pets from "./Pets";

const LOGIN_URL = "/auth/local";

const Login = () => {
  const { auth, setAuth } = useAuth();

  const [userCheck, setUserCheck] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      console.log("");
    } else {
      navigate(from, { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        LOGIN_URL,
        JSON.stringify({ identifier: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(resp?.data));

      const accessToken = resp?.data?.jwt;
      const ID = resp?.data?.user.id;
      setAuth({ user, pwd, ID, accessToken });
      // console.log(user, pwd, accessToken, ID);
      setUser("");
      setPwd("");

      localStorage.setItem("user", JSON.stringify(resp?.data));
    } catch (err) {
      if (!err?.resp) {
        setErrMsg("no Server Response");
      } else if (err.resp?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.resp?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("login faild");
      }
    }
  };
  return (
    <>
      <Form
        className='mx-auto my-5'
        style={{ width: 500, height: 200 }}
        as={Col}>
        <Alert variant='danger' className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder='email'
            type='text'
            id='username'
            autoComplete='off'
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            placeholder='Password'
            type='password'
            id='password'
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            required
          />
        </Form.Group>
        <Form.Group className='d-flex justify-content-around'>
          <Button type='submit' onClick={handleSubmit}>
            Sign In
          </Button>
          <Button type='null' href='/register'>
            Register
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
