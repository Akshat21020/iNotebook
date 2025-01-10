import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div >
      <div className="container h-screen flex items-center justify-center text-center" style={{marginTop : '100px'}}>
        <div>
          <h1>WELCOME TO INOTEBOOK!!</h1>
          <h4>
            iNotebook: Secure, cloud-powered, and free. Start capturing your
            ideas effortlessly today!
          </h4>
          <div className="container my-5"> 
          <Link type="button" to='/addnote' className="btn btn-outline-success btn-lg mx-5">Add a Note</Link>
          <Link type="button" to='/yournotes' className="btn btn-outline-success btn-lg">View your Notes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
