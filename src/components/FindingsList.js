import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Button from "react-bootstrap/esm/Button";

const FindingsList = ({ finding, updateId }) => {
  const { finding_name } = finding.attributes;
  const { id } = finding;

  const [sendPetId, setSendPetId] = useState();

  const handleClick = () => {
    updateId(id);
    console.log(finding_name);
    console.log(id);
  };

  return (
    <>
      <ListGroup.Item action onClick={() => handleClick()}>
        {finding_name}
      </ListGroup.Item>
    </>
  );
};

export default FindingsList;
