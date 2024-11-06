import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Reset = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUrl = window.location.href;
      const startIndex = currentUrl.indexOf('reset/');
      const resetPart = currentUrl.substring(startIndex);
      
      if (credentials.password === credentials.cnfPassword) {
        const response = await axios.put(
          `http://localhost:5000/api/forgot/${resetPart}`,
          { password: credentials.password },
          {
            headers: {
              "Content-Type": "application/json",
            } 
          }
        );
        console.log(response.data);
        setcredentials({ password: '', cnfPassword: '' });
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
      }
      alert("Error occurred. Please try again.");
    }
  }
  

  useEffect(() => {
    setcredentials({ password: '', cnfPassword: '' });
  }, []);

  const [credentials, setcredentials] = useState({ password: '', cnfPassword: '' });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container pt-3 pb-5" style={{ marginTop: '15vh', maxWidth: '40vw' }}>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-10">
          <h1 className="fw-bold mb-3 pb-4 d-flex justify-content-center" style={{ letterSpacing: '1px', color: "white" }}>
            Reset Password
          </h1>
          <div className="card" style={{ borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}>
            <div className="row g-0">
              <div className="col d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        New Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name='password'
                          value={credentials.password}
                          className="form-control form-control-lg"
                          style={{ border: '2px solid #adb5be', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                          onChange={onChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="btn btn-outline-dark"
                        >
                          {!showPassword ? <i className='fas fa-eye' /> : <i className='fas fa-eye-slash' />}
                        </button>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showCnfPassword ? "text" : "password"}
                          id="cnfPassword"
                          name='cnfPassword'
                          value={credentials.cnfPassword}
                          className="form-control form-control-lg"
                          style={{ border: '2px solid #adb5be', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                          onChange={onChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCnfPassword(!showCnfPassword)}
                          className="btn btn-outline-dark"
                        >
                          {!showCnfPassword ? <i className='fas fa-eye' /> : <i className='fas fa-eye-slash' />}
                        </button>
                      </div>
                    </div>
                    <div className="pt-1 mb-2 d-flex justify-content-center">
                      <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}