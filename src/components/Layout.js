import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Nav/Footer";

const Layout = () => {
  return (
    <>
      <div className='App'>
        <Nav />
        <main className='main-content'>
          <Outlet />
        </main>
        <footer className='footer'>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export default Layout;
