import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Appoitment from "./appoitment";

import useRefreshToken from "../hooks/useRefreshToken";

import Stack from "react-bootstrap/Stack";

import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function Pet({ props }) {
  const id = props[0];
  const { auth } = useAuth();
  // const [pet, setPet] = useState();

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [chipNumber, setChipNumber] = useState();

  const [appointments, setAppointments] = useState([]);

  const getApointment = async () => {
    try {
      const Token = auth?.accessToken;
      console.log(id);
      const resp = await axios.get(`/pets/${id}?populate=appointments`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
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
            </Stack>
          </Col>
        </Row>
        <Row className='mt-5 mb-1'>
          <Stack direction='horizontal' gap={3}>
            <Button active>zakończone</Button>
            <Button>zaplanowane</Button>
            <Button>wszytskie</Button>
          </Stack>
        </Row>
        <Row>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>nazwa wizyty</th>
                <th className=''>przychodznia</th>
                <th>data wizyty</th>
                <th>godzina</th>
                <th>lekarz</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className='my-2'>Badania krwi</p>
                </td>
                <td>
                  <p className='my-2 '>Żyrafa</p>
                </td>
                <td>
                  <p className='my-2'>1.01.1970 </p>
                </td>
                <td>
                  <p className='my-2'>13:26</p>
                </td>
                <td>
                  <p className='my-2'> dr. Marcin Matyja</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
      {/* <button onClick={() => refresh()}>JWT</button> */}
    </>
  );
}

export default Pet;
