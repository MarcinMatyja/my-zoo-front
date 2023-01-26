import React, { useEffect, useState } from "react";
import moment from "moment";

const AppoitmentsTable = ({ appointment, updateId }) => {
  const { Doctor, visit_name, appointment_date, clinic } =
    appointment.attributes;
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const id = appointment.id;

  // const appointment_date = "2022-01-11T04:17:00.000Z";
  // const mydate = moment("2022-01-11T04:17:00.000Z");

  // const month = mydate.month();

  useEffect(() => {
    // console.log(
    //   mydate.year(),
    //   month.toISOString(),
    //   mydate.day(),
    //   mydate.toISOString()
    // );

    const date = moment(appointment_date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    setHour(date.format("HH:mm"));
    setDay(date.format("DD"));
    setMonth(date.format("MM"));
    setYear(date.format("YYYY"));
    console.log(id);
    const today = new Date();
    console.log(appointment.attributes.appointment_date);
    console.log(today);
  });

  const handleClick = () => {
    updateId(id);
    console.log(id);
  };

  //   useEffect(() => {
  //     if (sendPetId == undefined) {
  //       console.log("co ty kurwa robisz?");
  //     } else {
  //       updateId(sendPetId);
  //     }
  //   }, [sendPetId]);

  //   const handleClick = () => {
  //     setSendPetId(JSON.stringify(id));
  //     console.log(id);
  //   };

  return (
    <>
      <tbody onClick={() => handleClick()}>
        <tr>
          <td>
            <p className='my-2'>{visit_name}</p>
          </td>
          <td>
            <p className='my-2 '>{clinic}</p>
          </td>
          <td>
            <p className='my-2'>{year + "-" + month + "-" + day}</p>
          </td>
          <td>
            <p className='my-2'>{hour}</p>
          </td>
          <td>
            <p className='my-2'> {Doctor}</p>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default AppoitmentsTable;
