import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export const AdminLogin = (props) => {

    useEffect(() => {
      setcredentials({ username: '', password: '' });
    }, []);
  
  const [credentials, setcredentials] = useState({ username: "", password: "" })
  
  const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await axios.post('http://localhost:5000/api/auth/admin/login', credentials)
        console.log(response.data)
      if (response.data.success) {
          //saveToken and redirect
          localStorage.setItem('token',response.data.authToken)
          localStorage.setItem('userType',"admin")
          navigate("/");
          props.showAlert("Logged IN Successfully","success")
      }
      else{
          props.showAlert("Invalid Credentials","danger")
      }
  }
  
    return (<>
        <div className="container mt-3 pb-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem',borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}> 
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                    //   src="https://imgs.search.brave.com/mairhmNLARtt6ykUPoygApG8gqBNnqi3u3EUPMmz0ic/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/bGF5LWxheS1iYWNr/LXNjaG9vbC1lbGVt/ZW50cy13aXRoLXN0/aWNreS1ub3Rlc18y/My0yMTQ4MTk4MTY4/LmpwZz9zaXplPTYy/NiZleHQ9anBn"
                    //   src='https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww&w=1000&q=80'
                    //   src='https://imgs.search.brave.com/PbHiuECrt7bbeuhYX2ZOw1b1pZK34aJ3rZrqVFLiJYw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NzA3OTAzNzY3Nzgt/YTlmYmM4NmQ3MGUy/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tkh4OFRH/OW5hVzRsTWpCd1lX/ZGxKVEl3WW1GamEy/ZHliM1Z1Wkh4bGJu/d3dmSHd3Zkh4OE1B/PT0.jpeg'
                    src='https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h3>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="username" name='username' value={credentials.username}
                            className="form-control form-control-lg"
                            style={{ border: '2px solid #adb5be',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor="text">
                            username
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password" name="password" value={credentials.password}
                            style={{ border: '2px solid #adb5bf',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)' }}
                            className="form-control form-control-lg"
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor='password'>
                            Password
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-success btn-lg btn-block" type="submit">
                            Login
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
      </>
    );
  };