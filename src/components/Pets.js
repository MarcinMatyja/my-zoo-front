import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import PetsTable from "./PetsTable";
import Pet from "./Pet";
import AddPet from "./AddPet";

const PETS_URL = "/users/me?populate=pets";

const Pets = () => {
  const { auth } = useAuth();
  const [pets, setPets] = useState([]);
  const [id, setId] = useState("");
  const [idcheck, setIdCheck] = useState(true);

  const updateId = (petId) => {
    setId(petId);
    id.length === 0 ? setIdCheck(false) : setIdCheck(true);
  };
  // useEffect(()=>{
  //   setChoose(true)
  // })

  // const showPet = ()=>{
  //   setChoose(!choose)
  // }
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
      {idcheck ? (
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
          </Table>
          {/* <button onClick={LoadAddPet()}>klikaj</button> */}
        </>
      ) : (
        <Pet props={id} />
      )}
      {/* <AddPet /> */}
    </>
  );
};

export default Pets;
