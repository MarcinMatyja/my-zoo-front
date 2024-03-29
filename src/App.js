import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from "./components/Pet";
import Appointment from "./components/Appointment";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, Navigate, Router, Link } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Pets from "./components/Pets";
import PersistLogin from "./components/PersistLogin";
import AddPet from "./components/AddPet";
import AddAppointment from "./components/AddAppointment";
import EditAppointment from "./components/EditAppointment";
import EditPet from "./components/editPet";
import AddFinding from "./components/AddFinding";
import Finding from "./components/Finding";
import EditFinding from "./components/EditFinding";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes  */}
        <Route path='login' element={<Login />} />{" "}
        <Route path='register' element={<Register />} />
        <Route element={<PersistLogin />}>
          {/* protected routes  */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Pets />} />
            <Route path='Addpet' element={<AddPet />} />
            <Route path='pet' element={<Pet />} />
            <Route path='addappointment' element={<AddAppointment />} />
            <Route path='editappointment' element={<EditAppointment />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='editpet' element={<EditPet />} />
            <Route path='addfinding' element={<AddFinding />} />
            <Route path='finding' element={<Finding />} />
            <Route path='editfinding' element={<EditFinding />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
