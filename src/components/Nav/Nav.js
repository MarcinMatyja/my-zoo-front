import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import useAuth from "../../hooks/useAuth";
import Logo from "../../svg/Logo.svg";

function Nav() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/");
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={Logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />
            {" My Zoo"}
          </Navbar.Brand>
          <Navbar.Collapse
            // className='justify-content-end'
            className={auth?.user ? "justify-content-end" : "offscreen"}>
            <a href='/' onClick={logout} className='logout'>
              Sign Out
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
