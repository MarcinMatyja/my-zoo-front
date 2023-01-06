import { useNavigate, Link } from "react-router-dom";
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
    localStorage.clear();
  };

  const navigator = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>
            <a
              href='/'
              onClick={navigator}
              style={{ textDecoration: "none", color: "white" }}>
              <img
                alt=''
                src={Logo}
                width='30'
                height='30'
                className='d-inline-block align-top'
              />
              {" My Zoo"}
            </a>
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
