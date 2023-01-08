import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import PetsTable from "./PetsTable";

const PETS_URL = "/users/me?populate=pets";

const Pets = () => {
  const { auth } = useAuth();
  const [pets, setPets] = useState([]);

  const navigate = useNavigate();

  const updateId = (petId) => {
    handleViewPet(petId);
  };
  const handleViewPet = (id) => {
    navigate("/Pet", { state: { id } });
  };

  const handleClick = () => {
    navigate("/AddPet");
  };

  useEffect(() => {
    const getPets = async () => {
      try {
        const Token = auth?.accessToken;
        const resp = await axios.get(PETS_URL, {
          headers: { Authorization: `Bearer ${Token}` },
          withCredentials: true,
        });
        console.log(resp.data.pets);
        setPets(resp.data.pets);
      } catch (err) {
        console.log(err);
      }
    };
    getPets();
  }, []);

  return (
    <>
      <Table
        bordered
        hover
        className=' my-3 mx-auto'
        style={{
          //height: 100,
          maxWidth: 1000,
        }}
        size='sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Chip number</th>
            <th>race</th>
            <th></th>
          </tr>
        </thead>

        {pets.map((pet) => (
          <PetsTable key={pet?.id} pet={pet} updateId={updateId} />
        ))}
        {/* To powodóje błąd w konsoli do poprawy trzeba przeniesc przycisk do Pets Table */}
        <Button
          variant='success'
          className='mt-2'
          onClick={() => handleClick()}>
          dodaj nowego członka zoo
        </Button>
      </Table>
      {/* <button onClick={LoadAddPet()}>dodaj nowego członka zoo</button> */}
    </>
  );
};

export default Pets;
