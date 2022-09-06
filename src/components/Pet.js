import React from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import useRefreshToken from "../hooks/useRefreshToken";

import Stack from "react-bootstrap/Stack";

import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";

function Pet() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const pet = {
    id: 1,
    name: "Grace",
    Chip_number: "123456789",
    date_of_birth: "2022-03-27",
    race: "neva masquerade",
  };
  return (
    <>
      <Container style={{ maxWidth: 1200 }}>
        <Row className='my-3'>
          <Col lg='6'>
            {/* <Table borderless>
              <tbody>
                <tr style={{ height: 2 }}>
                  <td
                    style={{
                      border: "solid 1px",
                      borderColor: "gray",
                    }}>
                    {pet.name}
                  </td>
                  <td>{pet.Chip_number}</td>
                </tr>
                <tr>
                  <td style={{ minWidth: 100 }}>{pet.date_of_birth}</td>
                  <td>{pet.race}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={2}>Larry the Bird</td>
                </tr>
              </tbody>
            </Table> */}

            <Stack direction='horizontal' gap={1} className='mx-auto '>
              <div>Imie:</div>
              <div className='bg-light border px-md-4 px-2 '>{pet.name}</div>
              <div className='ms-2'>Numer chipu:</div>
              <div className='bg-light border px-md-4 px-2'>
                {pet.Chip_number}
              </div>
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
                {pet.date_of_birth}
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
      <button onClick={() => refresh()}>JWT</button>
      <p>{JSON.stringify(auth.accessToken)}</p>
    </>
  );
}

export default Pet;
