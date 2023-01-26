import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/esm/Button";

const PetsTable = ({ pet, updateId }) => {
  const { id, name, chip_number, race } = pet;

  const [sendPetId, setSendPetId] = useState();

  useEffect(() => {
    if (sendPetId === undefined) {
    } else {
      updateId(sendPetId);
    }
  }, [sendPetId]);

  const handleClick = () => {
    setSendPetId(JSON.stringify(id));
    console.log(id);
  };

  return (
    <>
      <tbody>
        <tr>
          {/* <td>
            <p className='table_data'> {id} </p>
          </td> */}
          <td>
            <p className='table_data'> {name}</p>
          </td>
          <td>
            <p className='table_data'> {chip_number}</p>
          </td>
          <td>
            <p className='table_data'>{race}</p>
          </td>
          <td className='d-flex justify-content-center'>
            {/* <Link to='/Pet'> */}{" "}
            <Button className='mt-2' onClick={() => handleClick()}>
              Szczegóły
            </Button>
            {/* </Link> */}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default PetsTable;
