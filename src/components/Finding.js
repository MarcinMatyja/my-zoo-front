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
import Card from "react-bootstrap/Card";
import { FaEdit } from "react-icons/fa";

const Finding = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state.id;
  const { auth } = useAuth();
  const [finding_name, setFinding_name] = useState("");
  const [image, setImage] = useState("");
  const [Description, setDescription] = useState("");
  const [findingId, setFindingId] = useState("");
  const [data, setData] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate("/editfinding", { state: { data: data } });
  };
  const deleteFinding = async () => {
    // /api/findings/:id

    try {
      const Token = auth?.accessToken;
      const resp = await axios.delete(`/findings/${findingId}`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      console.log(resp);
      goBack();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFinding();
  }, []);

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
      setData(resp.data.data);
      setFindingId(resp.data.data.id);
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
          lg={1}
          md={3}
          sm={3}
          xs={3}
          className='mb-4 justify-content-center my-3'>
          <Card.Body className='justify-content-center'>
            <Card.Text style={{ fontSize: "25px" }}>{finding_name}</Card.Text>
          </Card.Body>
        </Row>
        <Row
          as={Col}
          lg={3}
          md={3}
          sm={3}
          xs={3}
          className='mb-4 justify-content-center'>
          <Card>
            <Card.Body className='justify-content-center'>
              <Card.Text style={{ fontSize: "15px" }}>{Description}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row className='mb-4 justify-content-center'>
          <Figure as={Col} lg={4} md={4} sm={3} xs={12}>
            <Figure.Image width={800} height={800} alt='800x800' src={image} />
          </Figure>
        </Row>

        <Row
          as={Col}
          lg={1}
          md={6}
          sm={6}
          xs={12}
          className='justify-content-center py-3'>
          <Container
            style={{ maxWidth: 500 }}
            className='d-flex justify-content-around'>
            <Button
              style={{ minWidth: 100 }}
              variant='success'
              className='btn-custom'
              onClick={() => {
                goBack();
              }}>
              Wróć
            </Button>
            <Button
              className='ms-2'
              variant='outline-primary'
              onClick={() => {
                handleEdit();
              }}>
              edytuj wynik
              <FaEdit className='ms-2 my-1' />
            </Button>
            <Button
              style={{ minWidth: 100 }}
              variant='danger'
              className='btn-custom'
              onClick={() => {
                deleteFinding();
              }}>
              Usuń
            </Button>
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default Finding;
