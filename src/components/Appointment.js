import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Badge from "react-bootstrap/Badge";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { FaEdit } from "react-icons/fa";
import AddAppointment from "./AddAppointment";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import FindingsList from "./FindingsList";
import ListGroup from "react-bootstrap/ListGroup";

const Appointment = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();
  const id = location.state.id;
  const [Lekarz, setLekarz] = useState("");
  const [visitName, setVisitName] = useState("");
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Clinic, setClinic] = useState("");
  const [appointmentData, setAppointmentData] = useState({});
  const [AppDate, setAppDete] = useState("");
  const [petId, setPetId] = useState("");
  const [findings, setFindings] = useState([]);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    navigate("/editappointment", { state: appointmentData });
  };
  function updateId(findingId) {
    const id = findingId;
    navigate("/finding", { state: { id: id } });
    console.log(findingId);
  }
  const handleDelete = async () => {
    try {
      const Token = auth?.accessToken;
      const resp = await axios.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true,
      });
      setShow(false);
      navigate("/Pet", { state: { id: petId } });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  const hadleAddFinding = () => {
    navigate("/addfinding", { state: { appId: id } });
  };
  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    console.log(id);
    const getApointment = async () => {
      try {
        const Token = auth?.accessToken;
        const resp = await axios.get(
          `/appointments/${id}?populate[findings][populate]=*&populate[pet][polpulate]=*`,
          {
            headers: { Authorization: `Bearer ${Token}` },
            withCredentials: true,
          }
        );
        console.log(resp.data.data);
        setAppDete(resp.data.data.attributes.appointment_date);
        setAppointmentData(resp.data.data);
        setDescription(resp.data.data.attributes.description_of_the_visit);
        setLekarz(resp.data.data.attributes.Doctor);
        setVisitName(resp.data.data.attributes.visit_name);
        setName(resp.data.data.attributes.pet.data.attributes.name);
        setClinic(resp.data.data.attributes.clinic);
        setPetId(resp.data.data.attributes.pet.data.id);
        setFindings(resp.data.data.attributes.findings.data);
      } catch (err) {
        console.log(err);
      }
    };
    getApointment();
  }, []);

  useEffect(() => {
    const date = moment(AppDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    setHour(date.format("HH:mm"));
    setDay(date.format("DD"));
    setMonth(date.format("MM"));
    setYear(date.format("YYYY"));
  }, [AppDate]);

  return (
    <>
      <Row className='mx-auto my-3' style={{ width: 500 }}>
        <Badge
          onClick={() => {
            goBack();
          }}>
          <h1>{Name.toUpperCase()}</h1>
        </Badge>
      </Row>
      <Row className='mx-auto d-flex' style={{ maxWidth: 1200 }}>
        <Col className='d-flex justify-content-start'>
          <Button
            variant='outline-primary'
            onClick={() => {
              handleClick();
            }}>
            Edytuj wizytę
            <FaEdit className='ms-2 my-1' />
          </Button>
          <Button className='ms-3' variant='danger' onClick={handleShow}>
            USUŃ WIZYTĘ
          </Button>
        </Col>
      </Row>
      <Row className='mx-auto d-flex mt-3 ' style={{ maxWidth: 1200 }}>
        <Col className='px-0 '>
          <Col
            className='bg-light border px-md-4 px-0 mb-3 justify-content-center d-flex'
            style={{ maxWidth: 600 }}>
            {Clinic.toUpperCase()}
          </Col>
        </Col>
      </Row>
      <Row className='mx-auto my-0' style={{ maxWidth: 1200 }}>
        <Card className='my-3' style={{ maxWidth: 600 }}>
          <Card.Text
            className=' p-2'
            align='justify'
            style={{ minHeight: 100 }}>
            {description}
          </Card.Text>
        </Card>
      </Row>
      <Row className='my-3 mx-auto' style={{ maxWidth: 1200 }}>
        <Col
          // direction='horizontal'
          style={{ maxWidth: 600 }}>
          <Row>
            <Col className='bg-light border justify-content-center d-flex'>
              {visitName}
            </Col>
          </Row>
          <Row className='d-flex justify-content-center mt-3'>
            <Col className='px-0 me-5'>
              <Col className='ms-2'>data wizyty</Col>
              <Col className='bg-light border justify-content-center d-flex '>
                {day + "-" + month + "-" + year + " " + hour}
              </Col>
            </Col>
            <Col className='px-0 ms-5'>
              <Col className='ms-2'>Lekarz</Col>
              <Col className='bg-light border justify-content-center d-flex'>
                {Lekarz}
              </Col>
            </Col>
          </Row>
        </Col>
        <Col>
          <ListGroup
            className='my-3 mx-auto py-1 px-3'
            style={{ maxWidth: 300 }}>
            {findings.map((finding) => (
              <FindingsList
                key={finding?.id}
                finding={finding}
                updateId={updateId}
              />
            ))}
          </ListGroup>
          <Row className='my-3 mx-auto py-1 px-3' style={{ maxWidth: 200 }}>
            <Button
              variant='primary'
              className='mt-auto'
              onClick={hadleAddFinding}>
              Dodaj wynik
            </Button>
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Czy jesteś pewny, że chcesz usunąć wizytę? <br /> Zmiany będą
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

export default Appointment;
