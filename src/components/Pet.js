import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Appoitment from "./Appointment";

import { FaEdit } from "react-icons/fa";

import useRefreshToken from "../hooks/useRefreshToken";

import Stack from "react-bootstrap/Stack";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AppoitmentsTable from "./AppointmentsTable";

import { useNavigate, useLocation } from "react-router-dom";

import AddPet from "./AddPet";

const Pet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const id = props.props;
  const id = location.state.id;
  const { auth } = useAuth();
  // const [pet, setPet] = useState();

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [chipNumber, setChipNumber] = useState();
  const [petData, setPetData] = useState();
  const [petId, setPetId] = useState("");

  const [show, setShow] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [appointments, setAppointments] = useState([]);

  function updateId(appointmentId) {
    const id = appointmentId;
    navigate("/appointment", { state: { id: id } });
    console.log(appointmentId);
  }

  const handleClick = (petId) => {
    navigate("/addappointment", { state: { petId: id } });
    console.log(petId);
  };

  useEffect(() => {
    console.log(id);
  });

  const handleDelete = async () => {
    try {
      console.log(id);
      const Token = auth.accessToken;
      const resp = await axios.delete(`/pets/${id}`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      console.log(Token);
      console.log(resp);
      setShow(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getApointment = async () => {
    try {
      const Token = auth?.accessToken;
      console.log(id);
      const resp = await axios.get(`/pets/${id}?populate=appointments`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      setPetData(resp.data.data.attributes);
      setPetId(resp.data.data.id);
      setName(resp.data.data.attributes.name);
      setBirthDate(resp.data.data.attributes.date_of_birth);
      setChipNumber(resp.data.data.attributes.chip_number);
      console.log(resp?.data.data.attributes);
      setAppointments(resp?.data.data.attributes.appointments.data);
      console.log(resp?.data.data.attributes.appointments.data);

      // setApointments(resp?.data.data.attributes.appointments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    navigate("/editPet", { state: { petData, petId } });
  };
  useEffect(() => {
    getApointment();
  }, []);

  return (
    <>
      <Container style={{ maxWidth: 1200 }}>
        <Row className='my-3'>
          <Col lg='6'>
            <Stack direction='horizontal' gap={1} className='mx-auto '>
              <div>Imie:</div>
              <div className='bg-light border px-md-4 px-2 '>{name}</div>
              <div className='ms-2'>Numer chipu:</div>
              <div className='bg-light border px-md-4 px-2'>{chipNumber}</div>
            </Stack>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col lg='6'>
            <Stack direction='horizontal' gap={1}>
              <div>data urodzenia:</div>
              <div
                className='bg-light border px-md-4 px-5'
                style={{ minWidth: 100 }}>
                {birthDate}
              </div>
              <Button
                className='ms-2'
                variant='outline-primary'
                onClick={() => {
                  handleEdit();
                }}>
                edytuj zwierze
                <FaEdit className='ms-2 my-1' />
              </Button>
            </Stack>
          </Col>
        </Row>
        <Row className='mt-5 mb-1'>
          <Stack direction='horizontal' className='d-flex' gap={3}>
            <Button active>zakończone</Button>
            <Button>zaplanowane</Button>
            <Button>wszytskie</Button>
            <Button variant='success' onClick={() => handleClick()}>
              dodaj wizytę|+
            </Button>
            <Button className='ms-auto' variant='danger' onClick={handleShow}>
              USUŃ ZWIERZE
            </Button>
          </Stack>
        </Row>
        <Row>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>nazwa wizyty</th>
                <th>przychodznia</th>
                <th>data wizyty</th>
                <th>godzina</th>
                <th>lekarz</th>
              </tr>
            </thead>
            {appointments.map((appointment) => (
              <AppoitmentsTable
                key={appointment.id}
                appointment={appointment}
                updateId={updateId}
              />
            ))}
          </Table>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Czy jesteś pewny, że chcesz usunąć zwierze? <br /> Zmiany będą
          nieodwracalne
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            ANULUJ
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            USUŃ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pet;
