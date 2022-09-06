import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import axios from "../api/axios";

import { UserContext } from "../context/UserContext";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/auth/local/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    setValidMail(result);
  }, [mail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = MAIL_REGEX.test(mail);
    if (!v1 || !v2 || !v3) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd, email: mail }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setMail("");
      setUser("");
      setMatchPwd("");
      setPwd("");
      //logi zwrotki
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));

      // clear input to add
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server Responce");
      } else if (err.response?.status === 409) {
        setErrMsg("user taken");
      } else {
        setErrMsg("Registration fail");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Form
        className='mx-auto my-5'
        style={{ width: 350, height: 400 }}
        as={Col}>
        <Alert variant='danger' className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </Alert>
        <Form.Group className='mb-3' as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder='Username'
            type='text'
            id='username'
            onChange={(e) => {
              setUser(e.target.value);
            }}
            ref={userRef}
            autoComplete='off'
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            value={user}
          />
          <p
            id='uidnote'
            className={userFocus && !validName ? "instructions" : "offscreen"}>
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, nymbers, underscores, hyphens allowed.
          </p>
        </Form.Group>
        <Form.Group className='mb-3' as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder='email'
            type='email'
            id='email'
            onChange={(e) => {
              setMail(e.target.value);
            }}
            autoComplete='off'
            required
            onFocus={() => setMailFocus(true)}
            onBlur={() => setMailFocus(false)}
            value={mail}
          />
        </Form.Group>
        <Form.Group className='mb-3' as={Col}>
          <Form.Label>password</Form.Label>
          <Form.Control
            placeholder='Password'
            type='password'
            id='password'
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            autoComplete='off'
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            value={pwd}
          />
          <p
            id='pwdnote'
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, and number and a
            special character.
            <br />
            Allowed special characters:{" "}
            <span aria-label='exclamation mark'>!</span>
            <span aria-label='at symbol'>@</span>
            <span aria-label='hashtag'>#</span>
            <span aria-label='percent'>%</span>
          </p>
        </Form.Group>
        <Form.Group className='mb-3' as={Col}>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            placeholder='Password'
            type='password'
            id='ConfirmPassword'
            onChange={(e) => {
              setMatchPwd(e.target.value);
            }}
            autoComplete='off'
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby='confirmnote'
            value={matchPwd}
          />
          <p
            id='confirmnote'
            className={
              matchFocus && !validMatch ? "instructions" : "offscreen"
            }>
            Must match password.
          </p>
        </Form.Group>

        <Form.Group className='d-flex justify-content-around'>
          <Button
            type='submit'
            onClick={handleSubmit}
            disabled={
              !validMatch || !validPwd || !validName || !validMail
                ? true
                : false
            }>
            Sign Up
          </Button>
          <Button type='null' href='/login'>
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
