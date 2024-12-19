import { Link } from "react-router-dom";
import LogoutPage from "../Pages/LogoutPage";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div
      style={{
        zIndex: 1000,
        backgroundColor: "#77b1b5",
        position: "sticky",
        top: 0,
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light px-5 shadow ">
        <div className="container-fluid">
          <img
            src="../../public/Images/logo.png"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <a className="navbar-brand" href="#">
            InternPro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item me-5">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link to="/price" className="nav-link">
                  Price
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                 
                  
                </>
              ) : (
                <>
<li className="nav-item me-5">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link to="/create" className="nav-link">
                      SignUp
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <LogoutPage />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
