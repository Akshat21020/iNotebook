import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Login(props) {
   const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({email : "" , password : ""})
    let navigate = useNavigate();

    //API call for user login
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //API call
        const response = await fetch(`${host}/api/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await response.json()
        console.log(json)

        //If success is true(success wala code backend wale folder mein hai)
        if(json.success){
            //Save the auth token of the user in the local storage 
            localStorage.setItem('token',json.authtoken);
            //Adding alert
            props.showAlert("Logged In Successfully","success")
            //Redirecting the user to our Home page
            navigate('/');
        }
        else{
          props.showAlert("Invalid Credentials - Try Again","Danger")
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
            <h1>Welcome back to iNotebook</h1>
            <h5>Login to access your notebook</h5>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt=''/>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
            <h2 className='my-3'>Login</h2>
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
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                    className="link-danger">Register</Link></p>
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

export default Login
