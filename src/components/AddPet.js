import React from "react";
import { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const AddPet = () => {
  const ADDPET_URL = "/pets";

  const NameRef = useRef();

  const { auth } = useAuth();
  const [Name, setName] = useState("");
  const [Width, setWidth] = useState(0);
  const [Hodowla, setHodowla] = useState("");
  const [Race, setRace] = useState("");
  const [HodowcaShow, setHodowcaShow] = useState(false);
  const [Umaszczenie, setUmaszczenie] = useState("");
  const [Gatunek, setGatunek] = useState("");
  const [Gender, setGender] = useState("");
  const [ChipNumber, setChipNumber] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    // const loggedInUser = localStorage.getItem("user");
    
    // const foundUser = JSON.parse(loggedInUser);

    // const id = foundUser.user.id;
    // setOwner(id);
    const 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        ADDPET_URL,
        JSON.stringify({
          name: Name,
          race: Race,
          species: Gatunek,
          gender: Gender,
          chip_number: ChipNumber,
          owner: [owner],
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(resp?.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className='my-5 ' onSubmit={handleSubmit}>
      <Row className='mb-4 justify-content-center'>
        <Form.Group as={Col} lg={4} md={4} sm={3} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Imie'
            className='ColorFormFont '>
            <Form.Control
              type='Name'
              placeholder='Imie'
              ref={NameRef}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={Name}
              autoComplete='off'
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} lg={2} md={2} sm={3} xs={12}>
          <FloatingLabel controlId='floatingInput' label='Gatunek'>
            <Form.Select
              defaultValue=''
              required
              onChange={(e) => {
                setGatunek(e.target.value);
              }}>
              <option value=''></option>
              <option value='Kot'>Kot</option>
              <option value='Pies'>Pies</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className='mb-4 justify-content-center'>
        <FormGroup as={Col} lg={4} md={4} sm={3} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Rasa'
            className='ColorFormFont'>
            <Form.Control
              type='Rasa'
              placeholder='Rasa'
              required
              value={Race}
              onChange={(e) => {
                setRace(e.target.value);
              }}
              autoComplete='off'
            />
          </FloatingLabel>
        </FormGroup>
        <Form.Group as={Col} lg={2} md={2} sm={3} xs={12}>
          <FloatingLabel controlId='floatingInput' label='Płeć'>
            <Form.Select
              defaultValue=''
              required
              onChange={(e) => {
                setGender(e.target.value);
              }}>
              <option value=''></option>
              <option value='Female'>F</option>
              <option value='Male'>M</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className='mb-4 justify-content-center'>
        <Form.Group controlId='dob' as={Col} lg={6} md={6} sm={6} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Data urodzenia'
            className='ColorFormFont'>
            <Form.Control
              type='date'
              name='dob'
              placeholder='Due date'
              value={BirthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className='mb-4 justify-content-center'>
        <Form.Group as={Col} lg={6} md={6} sm={8} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Umaszczenie'
            className='ColorFormFont'>
            <Form.Control
              type='Umaszczenie'
              placeholder='Umaszczenie'
              onChange={(e) => {
                setUmaszczenie(e.target.value);
              }}
              autoComplete='off'
              value={Umaszczenie}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className={HodowcaShow && Width < 500 ? "" : "offscreen"}>
        <Form.Group as={Col} lg={6} md={6} sm={6} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Hodowla'
            className='ColorFormFont'>
            <Form.Control
              type='Name'
              placeholder='Imie'
              onChange={(e) => {
                setHodowla(e.target.value);
              }}
              value={Hodowla}
              autoComplete='off'
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className='mb-4 justify-content-center'>
        <Form.Group as={Col} lg={6} md={6} sm={6} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Nr czipu'
            className='ColorFormFont'>
            <Form.Control
              type='Nr czipu'
              placeholder='Nr czipu'
              onChange={(e) => {
                setChipNumber(e.target.value);
              }}
              autoComplete='off'
            />
            <Form.Text>Format: 0000-0000-0000-0000</Form.Text>
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row
        className={
          HodowcaShow && Width > 500
            ? " mb-4 justify-content-center"
            : "offscreen"
        }>
        <Form.Group as={Col} lg={6} md={6} sm={6} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Nazwa Hodowli'
            className='ColorFormFont'>
            <Form.Control
              type='Name'
              placeholder='Imie'
              onChange={(e) => {
                setHodowla(e.target.value);
              }}
              value={Hodowla}
              autoComplete='off'
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row
        as={Col}
        lg={6}
        md={6}
        sm={6}
        xs={12}
        className='justify-content-center'>
        <Form.Check
          type='switch'
          id='hodowla-switch'
          label='Dodaj hodowlę'
          className='mx-auto my-auto'
          onChange={(e) => {
            setWidth(window.screen.width);
            setHodowcaShow(!HodowcaShow);
          }}
        />

        <Button variant='outline' type='submit' className='btn-custom'>
          Submit
        </Button>
      </Row>
    </Form>
  );
};

export default AddPet;
