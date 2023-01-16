import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const AddAppointment = () => {
  const location = useLocation();
  const petId = location.state.petId;
  const ADDPET_URL = "/appointments";

  const { auth } = useAuth();
  const [visit_name, setVisit_name] = useState("");
  const [Lekarz, setLekarz] = useState("");
  const [Clinic, setClinic] = useState("");
  const [VisitDate, setVisitDate] = useState("");
  const [Token, setToken] = useState(auth.accessToken);
  const [Descrioption, setDescription] = useState("");

  const navigate = useNavigate();

  const navigator = () => {
    navigate("/");
  };
  useEffect(() => {
    console.log();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        ADDPET_URL,
        JSON.stringify({
          data: {
            visit_name: visit_name,
            Doctor: Lekarz,
            clinic: Clinic,
            appointment_date: VisitDate,
            description_of_the_visit: Descrioption,
            findings: [],
            pet: [petId],
          },
        }),

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(resp?.data));
      setVisit_name("");
      setLekarz("");
      setVisitDate("");
      setClinic("");
      navigator();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className='my-5 ' onSubmit={handleSubmit}>
      <Row className='mb-4 justify-content-center'>
        <Form.Group as={Col} lg={2} md={2} sm={4} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Nazwa wizyty'
            className='ColorFormFont '>
            <Form.Control
              type='nazwa wizyty'
              placeholder='visit_name'
              onChange={(e) => {
                setVisit_name(e.target.value);
              }}
              value={visit_name}
              autoComplete='off'
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} lg={2} md={2} sm={4} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Nazwa Kliniki'
            className='ColorFormFont '>
            <Form.Control
              type='nazwa Kliniki'
              placeholder='visit_name'
              onChange={(e) => {
                setClinic(e.target.value);
              }}
              value={Clinic}
              autoComplete='off'
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} lg={2} md={2} sm={3} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Lekarz'
            className='ColorFormFont '>
            <Form.Control
              type='Lekarz'
              placeholder='Lekarz'
              onChange={(e) => {
                setLekarz(e.target.value);
              }}
              value={Lekarz}
              autoComplete='off'
              required
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row className='mb-4 justify-content-center'>
        <FormGroup as={Col} lg={4} md={4} sm={3} xs={12}>
          <FloatingLabel
            controlId='floatingTextarea'
            label='Opis wizyty'
            className='ColorFormFont'>
            {/* <Form.Control
              type='Rasa'
              placeholder='Rasa'
              required
              value={Race}
              onChange={(e) => {
                setRace(e.target.value);
              }}
              autoComplete='off'
            /> */}
            <Form.Control
              as='textarea'
              placeholder='Leave a comment her'
              style={{ height: 100 }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FloatingLabel>
        </FormGroup>
        <Form.Group controlId='dob' as={Col} lg={2} md={2} sm={1} xs={12}>
          <FloatingLabel
            controlId='floatingInput'
            label='Data wizyty'
            className='ColorFormFont'>
            <Form.Control
              type='datetime-local'
              name='dob'
              placeholder='Due date'
              value={VisitDate}
              onChange={(e) => setVisitDate(e.target.value)}
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
        <Button variant='success' type='submit' className='btn-custom'>
          Submit
        </Button>
      </Row>
    </Form>
  );
};

export default AddAppointment;
