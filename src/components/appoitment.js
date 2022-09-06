import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Badge from "react-bootstrap/Badge";

function appoitment() {
  return (
    <>
      <h1>
        <Badge bg='info'>Grace</Badge>
      </h1>
      <Row className='mx-auto' style={{ maxWidth: 1200 }}>
        <Card className='my-3' style={{ maxWidth: 600 }}>
          <Card.Text className=' p-2' align='justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus sed vitae, id, quod tempore facilis unde molestias nisi
            nobis ea odio, necessitatibus numquam. Nostrum ipsum vel laboriosam?
            Tenetur, ex unde! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Non quisquam ratione dolore incidunt, sed
            dignissimos culpa quas a beatae iure impedit doloremque, vitae
            consequuntur, harum libero aliquam voluptate itaque provident.
          </Card.Text>
        </Card>
        <Card
          className='my-3 mx-auto py-2'
          style={{ maxWidth: 200, maxHeight: 200 }}>
          <Card.Img
            variant='top'
            src='holder.js/100px180'
            style={{ maxWidth: 150, maxHeight: 150 }}
            className='mx-auto my-auto'
          />
          <Button variant='primary' className='mt-auto'>
            Wyniki Badań
          </Button>
        </Card>
      </Row>

      {/* <Table
        bordered
        hover
        className=' my-3 mx-auto '
        style={{ maxWidth: 1200 }}
        size='sm'>
        <tbody>
          <tr>
            <td></td>
            <td colSpan={1}>
              <p className='Tabeleczka'>imie</p>
            </td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
            <td>
              <p className='Tabeleczka'> @wp </p>
            </td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
            <td>
              <p className='Tabeleczka'> Grace </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table> */}

      <Container className='my-3 mx-auto' style={{ maxWidth: 1200 }}>
        <Row>
          <Col
            // direction='horizontal'
            style={{ maxWidth: 600 }}>
            <Row className='bg-light border px-md-4 px-2 mb-3'>
              <Col>USG jamy brzusznej</Col>
            </Row>

            {/* <Stack
              // direction='horizontal'
              gap={2}
              className='mx-auto my-2'> */}
            <Row>
              <Col className=''>
                <Col className='ms-2'>data wizyty:</Col>
                <Col className='bg-light border px-md-4'>21.08.2022</Col>
              </Col>
              <Col>
                <Col>data modyfikacji:</Col>
                <Col className='bg-light border px-md-4'>20.08.2022</Col>
              </Col>
              <Col>
                <Col className='ms-2'>Lekarz:</Col>
                <Col className='bg-light border px-md-4'>dr. Marcin Matyja</Col>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card className='my-3 mx-auto py-1 px-3' style={{ maxWidth: 200 }}>
              <Card.Text align='justify'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default appoitment;
