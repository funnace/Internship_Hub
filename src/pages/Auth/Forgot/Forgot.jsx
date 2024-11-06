import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const Forgot = (props) => {

  let navigate = useNavigate();

  useEffect(() => {
    setemail("");
  }, []);

  const [email, setemail] = useState("")

  const onChange = (e) => {
    setemail(e.target.value)
  }

  // let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userType = localStorage.getItem('userType')
      let response;

      if (userType === 'user') {
        response = await axios.post(`http://localhost:5000/api/forgot/user`, { email });
      }
      else if (userType === 'provider') {
        response = await axios.post(`http://localhost:5000/api/forgot/provider`, { email });
      }
      console.log(response.data);
      if (response.data.status === "User Not Exists!!") {
        props.showAlert("User does not exists!","danger");
      } else {
        props.showAlert("Reset link sent to your email","success");
        setemail('');
        navigate(`/${userType}/login`)
      }
    }
    catch (error) {
      console.error(error.response.data);
      props.showAlert("Error","danger");
    }
  }
  return (
    <div className="container" style={{ marginTop: '23vh', maxWidth: '40vw' }}>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <h1 className="fw-bold mb-3 pb-4 d-flex justify-content-center" style={{ letterSpacing: '1px', color: 'white' }}>
            Forgot Password
          </h1>
          <div className="card" style={{ borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}>
            <div className="row g-0">
              <div className="col d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form
                    onSubmit={handleSubmit}
                  >
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        placeholder='Email address'
                        id="email" name='email'
                        value={email}
                        className="form-control form-control-lg"
                        style={{ border: '2px solid #adb5be', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                        onChange={onChange}
                      />

                    </div>
                    <div className="pt-1 mb-2 d-flex justify-content-center">
                      <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Send Reset Link
                      </button>
                    </div>
                    <div className="pt-1 mt-4 d-flex flex-column align-items-center">
                      {localStorage.getItem('userType') === 'provider' ? (
                        <Link style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.3s' }} to="/provider/login" onMouseOver={(e) => e.target.style.color = '#555'} // Darken color on mouseover
                          onMouseOut={(e) => e.target.style.color = 'black'}>Back To Login</Link>
                      ) : localStorage.getItem('userType') === 'user' ? (
                        <Link style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.3s' }} to="/user/login" onMouseOver={(e) => e.target.style.color = '#555'} // Darken color on mouseover
                          onMouseOut={(e) => e.target.style.color = 'black'}>Back To Login</Link>
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
