import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const ContactUs = (props) => {

  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/Front")
    }
  }, [navigate])

  const [contact, setcontact] = useState({ username:"", email: "", phone: "",query: "" })

  const onChange = (e) => {
      setcontact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('token');
      const userType =  localStorage.getItem('userType')

      const response = await axios.post(
        `http://localhost:5000/api/comm/${userType === 'user' ? 'usercontact' : 'providercontact'}`,
        contact,
          {
              headers: {
                'auth-token' : authToken
              }
          }
      );

      console.log(response.data);
      if (response.data.success) {
        props.showAlert('Contacted Successfully', 'success');
        setcontact({ username: "", email: "", phone: "", query: "" });
      }
    } catch (error) {
      console.error(error.response.data);     
        props.showAlert("Fill All the fields","danger")
    }
  };


  return (
    <div className="container-fluid" style={{marginTop: '90px'}}>
    <div className="row d-flex justify-content-center align-items-center" style={{marginBottom:'100px'}}>
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: '1rem',borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}> 
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
               src={process.env.PUBLIC_URL + '/images/Contactus (2).jpg'}
               alt="login form"
                className="img-fluid"
                style={{ borderRadius: '1rem 0 0 1rem' }}
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black"> 
                <form onSubmit={handleSubmit}>
                  <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Contact Us
                  </h3>
                  <div className="form-outline mb-4">
                        <input placeholder="Harry Potter"
                          type="text" id="username" name='username' value={contact.username}
                          style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1', fontSize:'1.1em' }}
                          className="form-control form-control-lg"
                          onChange={onChange}
                        />
                        <label className="form-label mt-1" htmlFor='username'>
                          Name
                        </label>
                      </div>
                  <div className="form-outline mb-4">
                    <input
                      type="email" placeholder="intern@email.com"
                      id="email" name='email' value={contact.email}
                      className="form-control form-control-lg"
                      style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1', fontSize:'1.1em' }}
                      onChange={onChange}
                    />
                    <label className="form-label mt-1" htmlFor="email">
                      Email address
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="number" placeholder="+91 0123456789"
                      id="phone" name="phone" value={contact.phone}
                      style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1', fontSize:'1.1em' }}
                      className="form-control form-control-lg"
                      onChange={onChange}
                    />
                    <label className="form-label mt-1" htmlFor='phone'>
                      Phone No.
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                  <textarea className="form-control form-control-lg" id="query" cols="30" rows="10" placeholder="Ask Your Questions Here" name="query" value={contact.query}
                      style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1', height: '100px', fontSize:'1.1em'}} onChange={onChange}></textarea>
                    <label className="form-label mt-1" htmlFor='query'>
                      Your Question 
                    </label>
                  </div>                
                 <div className="pt-1 mb-4">
                    <button className="btn btn-primary border border-3 btn-lg btn-block" type="submit">
                      Send Message
                    </button>
                  </div>
                  <p style={{ color: '#393f81' }}>
                      Please Leave a Review Here=&gt;&nbsp; <Link style={{ color: '#393f81' }} to="/Feedback">
                        Feedback
                      </Link>
                    </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  )
}
