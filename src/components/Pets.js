import { useNavigate, Link } from "react-router-dom";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import refresh from "../hooks/useRefreshToken";

const Pets = () => {
  const pet = {
    id: 1,
    name: "Grace",
    Chip_number: "123456789",
    date_of_birth: "2022-03-27",
    race: "neva masquerade",
  };
  console.log({ pet });
  return (
    <Table
      bordered
      hover
      className=' my-3 mx-auto'
      style={{ height: 100, maxWidth: 1200 }}
      size='sm'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Chip number</th>
          <th>race</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p className='table_data'> {pet.id} </p>
          </td>
          <td>
            <p className='table_data'> {pet.name}</p>
          </td>
          <td>
            <p className='table_data'> {pet.Chip_number}</p>
          </td>
          <td>
            <p className='table_data'>{pet.race}</p>
          </td>
          <td>
            <Link to='/Pet'>
              {" "}
              <Button className='mt-2 '>Szczegóły</Button>
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Pets;
