import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router'

function Signup(props) {
    const host = "http://localhost:5000"
    const navigate =  useNavigate();
    const [credentials, setCredentials] = useState({name : "",email : "" , password : ""})

    //API call for user login
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name , email , password} = credentials
        //API call
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({name , email , password})
        });
        const json = await response.json()
        console.log(json)
        //If success is true(success wala code backend wale folder mein hai)
        if(json.success){
            //Save the auth token of the user in the local storage 
            localStorage.setItem('token',json.authtoken);
            //Redirecting the user to our Home page
            navigate('/');
            //Adding alert
            props.showAlert("Account Created Successfully",'Success')
        }
        else{
          props.showAlert("Invalid Details",'Danger')
        }
    }
    //Placeholders onChange function
    const handleonChange = (e) =>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

  return (
    <>
    <div className="vh-100 d-flex justify-content-center align-items-center">
  <div className="container">
    <section>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
          <h1>Welcome to iNotebook</h1>
          <h5>SignUp to have a private notebook on the cloud</h5>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt=''/>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
            <h2 className='my-3'>Create a New Account</h2>
            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3"><strong>Name</strong></label>
                <input type="text" id="name" name="name" required value={credentials.name} onChange={handleonChange} className="form-control form-control-lg"
                  placeholder="Enter your name" />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example3"><strong>Email address</strong></label>
                <input type="email" id="email" name="email" required value={credentials.email} onChange={handleonChange} className="form-control form-control-lg"
                  placeholder="Enter a valid email address" />
              </div>
              <div data-mdb-input-init className="form-outline mb-3">
              <label className="form-label" htmlFor="form3Example4"><strong>Password</strong></label>
                <input type="password" id="password" name="password" required value={credentials.password} onChange={handleonChange} className="form-control form-control-lg"
                  placeholder="Enter password" />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Sign Up</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login"
                    className="link-danger">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</>
  )
}

export default Signup
