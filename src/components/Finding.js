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
import Container from "react-bootstrap/esm/Container";
import Figure from "react-bootstrap/Figure";
import Badge from "react-bootstrap/Badge";

const Finding = () => {
  const ADDFINDINGS_URL = "/findings";

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  const location = useLocation();
  const id = location.state.id;
  const { auth } = useAuth();
  const [finding_name, setFinding_name] = useState("");
  const [image, setImage] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    getFinding();
  });

  const getFinding = async (e) => {
    try {
      const Token = auth?.accessToken;
      const resp = await axios.get(`/findings/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        withCredentials: true,
      });
      setImage(
        "http://localhost:1337" +
          resp.data.data.attributes.related_files.data.attributes.formats.large
            .url
      );
      setDescription(resp.data.data.attributes.description);
      setFinding_name(resp.data.data.attributes.finding_name);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container style={{ maxWidth: 2000 }}>
        <Row
          as={Col}
          lg={3}
          md={3}
          sm={3}
          xs={3}
          className='mb-4 justify-content-center'>
          <Badge bg='light' text='dark'>
            <h3>{finding_name}</h3>
          </Badge>
        </Row>
        <Row className='mb-4 justify-content-center'>
          <Figure as={Col} lg={4} md={4} sm={3} xs={12}>
            <Figure.Image width={800} height={800} alt='800x800' src={image} />
            <Figure.Caption>{Description}</Figure.Caption>
          </Figure>
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
      </Container>
    </>
  );
};

export default Finding;
