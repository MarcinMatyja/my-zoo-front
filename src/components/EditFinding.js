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

const EditFinding = () => {
  const ADDFINDINGS_URL = "/findings";

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    setDescription(location.state.data.attributes.description);
    setFinding_name(location.state.data.attributes.finding_name);
  }, []);
  const location = useLocation();
  const findingId = location.state.data.id;
  const { auth } = useAuth();
  const [finding_name, setFinding_name] = useState("");
  //   const [file, setFile] = useState();
  const [Description, setDescription] = useState("");

  //   const handleFileChange = (event) => {
  //     setFile(event.target.files[0]);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      finding_name: finding_name,
      description: Description,
    };
    formData.append("data", JSON.stringify(data));
    // formData.append("files.related_files", file);

    console.log(data);
    console.log(formData.data);
    try {
      const Token = auth?.accessToken;
      const resp = await axios.put(`/findings/${findingId}`, formData, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        withCredentials: true,
      });
      console.log(resp);
      goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container style={{ maxWidth: 2000 }}>
        <Form className='my-5 ' onSubmit={handleSubmit}>
          <Row className='mb-4 justify-content-center'>
            <Form.Group as={Col} lg={4} md={4} sm={3} xs={12}>
              <FloatingLabel
                controlId='floatingInput'
                label='Nazwa załącznika'
                className='ColorFormFont '>
                <Form.Control
                  type='nazwa wizyty'
                  placeholder='fiding_name'
                  onChange={(e) => {
                    setFinding_name(e.target.value);
                  }}
                  value={finding_name}
                  autoComplete='off'
                  required
                />
              </FloatingLabel>
            </Form.Group>
            {/* <Row className='mb-4 justify-content-center'>
              <Form.Group
                controlId='formFile'
                as={Col}
                lg={4}
                md={4}
                sm={3}
                xs={12}>
                <Form.Label>Załącznik</Form.Label>
                <Form.Control
                  type='file'
                  placeholder='załącznik'
                  onChange={handleFileChange}
                  autoComplete='off'
                />
              </Form.Group>
            </Row> */}
          </Row>
          <Row className='mb-4 justify-content-center'>
            <FormGroup as={Col} lg={4} md={4} sm={3} xs={12}>
              <FloatingLabel
                controlId='floatingTextarea'
                label='Opis wizyty'
                className='ColorFormFont'>
                <Form.Control
                  value={Description}
                  as='textarea'
                  placeholder='Leave a comment her'
                  style={{ height: 100 }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FloatingLabel>
            </FormGroup>
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
      </Container>
    </>
  );
};

export default EditFinding;
