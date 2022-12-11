import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Register from "./components/Register";
// import Pets from "./components/Pets";
import Pet from "./components/Pet";
import Appoitment from "./components/appoitment";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, Navigate, Router, Link } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Pets from "./components/Pets";
import PersistLogin from "./components/PersistLogin";

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
            <Route path='pet' element={<Pet />} />
            <Route path='pets' element={<Pets />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
