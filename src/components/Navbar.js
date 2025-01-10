import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black text-white">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            iNotebook
          </Link>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link text-white`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-white`}
                  aria-current="page"
                  to="/addnote"
                >
                  Add Note
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-white`}
                  aria-current="page"
                  to="/yournotes"
                >
                  Your Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-white`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <div className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
            </div> :<button onClick={handleLogout} className="btn btn-primary"> Logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
