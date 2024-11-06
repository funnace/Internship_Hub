import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export const UserLogin = (props) => {

  useEffect(() => {
    setcredentials({ email: '', password: '' });
  }, []);

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json)
    if (json.success) {
      //saveToken and redirect
      localStorage.setItem('token', json.authToken)
      localStorage.setItem('userType', json.userType)
      navigate("/");
      props.showAlert("Logged IN Successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  return (<>
    <div className="container d-flex justify-content-center align-items-center" style={{ maxHeight: '67vh', maxWidth: '67vw',marginTop: '4rem'  }}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card h-100" style={{ borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src='https://images.unsplash.com/photo-1530467212787-ae644315e6bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
                  alt="login form"
                  className="img-fluid h-100" // Ensure image covers the full height
                  style={{ borderRadius: '1rem 0 0 1rem', objectFit: 'cover' }} // Ensure image covers the entire space
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-start flex-column justify-content-between"> {/* Align items to start and stack vertically */}
                <div className="card-body p-4 p-lg-5 text-black">
                  <h3 className="fw-bold mb-4 pb-3" style={{ letterSpacing: '1px', marginTop: 0 }}>
                    Sign into your user account
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        name='email'
                        value={credentials.email}
                        placeholder='Email'
                        className="form-control form-control-lg"
                        style={{ border: '2px solid #adb5be', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        placeholder='Password'
                        id="password"
                        name="password"
                        value={credentials.password}
                        style={{ border: '2px solid #adb5bf', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                        className="form-control form-control-lg"
                        onChange={onChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-success btn-lg px-4" type="submit">Login</button>
                    </div>
                    <div className="text-center mt-2 mb-1">OR</div>

                    <Link className="mb-3 d-flex justify-content-center" style={{ color: 'blue' }} to="/forgot" onClick={()=> localStorage.setItem('userType','user')}>Forgot Password</Link>

                    <div className="pt-1 d-flex flex-column align-items-center" style={{ borderRadius: '0.5rem', borderColor: '#adb5bd', border: '1px solid rgba(0,0,0,0.4)' }}>
                      <span className="mb-2" style={{ color: '#393f81' }}>Don't have an account? <Link style={{ color: '#393f81' }} to="/user/register">Register here</Link></span>
                      <span style={{ color: '#393f81' }}>Login as a Provider! <Link style={{ color: '#393f81' }} to="/provider/login">Provider Login</Link></span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};