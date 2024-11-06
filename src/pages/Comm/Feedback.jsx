import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const Feedback = (props) => {

  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/Front")
    }
  }, [navigate])

  const [feedback, setfeedback] = useState({ username:"", feedbacktype: "", title:"", fdback: ""})

  const onChange = (e) => {
      setfeedback({ ...feedback, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('token');
      const userType =  localStorage.getItem('userType')
      const response = await axios.post(
        `http://localhost:5000/api/comm/${userType === 'user' ? 'userfdback' : 'providerfdback'}`,
        feedback,
          {
              headers: {
                'auth-token' : authToken
              }
          }
      );

      console.log(response.data);
      if (response.data.success) {
        props.showAlert('Added Feedback Successfully', 'success');
        setfeedback({ username:"", feedbacktype: "", fdback: "", title: "" });
      }
    } catch (error) {
      console.error(error.response.data);     
        props.showAlert("Fill All the fields","danger")
    }
  };

  return (
    <div className="container-fluid" style={{marginTop: '90px'}}>
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: '1rem',borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}> 
          <div className="row g-0">
            <div className="col-md-6 col-lg-6 d-none d-md-block">
              <img
               src="https://cdn.pixabay.com/photo/2018/09/24/15/04/board-3700116_960_720.jpg"
               alt="login form"
                className="img-fluid"
                style={{ borderRadius: '1rem 0 0 1rem',backgroundSize: 'cover',
          backgroundPosition: 'center', width: '100%',
          height: '715px', maxHeight: '100%'}}
              />
            </div>
            <div className="col-md-6 col-lg-6 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black"> 
                <form onSubmit={handleSubmit}>
                  <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Feedback
                  </h3>
                  <div className="form-outline mb-3">
                        <input placeholder="Harry Potter"
                          type="text" id="username" name='username' value={feedback.username}
                          style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)', fontSize:'1.1em' }}
                          className="form-control form-control-lg"
                          onChange={onChange}
                        />
                        <label className="form-label mt-1" htmlFor='username'>
                          Name
                        </label>
                      </div>
                  <div className="form-outline mb-3">
        <div className="select-box">
        <select 
  id="feedbacktype" 
  className='px-2 py-2 rounded' 
  style={{ 
    border: '2px solid #adb5bd',
    boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)'
  }}
  value={feedback.feedbacktype}
  onChange={(e) => setfeedback({ ...feedback, feedbacktype: e.target.value })}
>
  <option value="" disabled>Select Feedback Type</option>
  <option value="Complaint">Complaint</option>
  <option value="Suggestion">Suggestion</option>
  <option value="Question">Question</option>
  <option value="Review">Review</option>
  <option value="Other">Other</option>
</select>
      </div>
      <label className="form-label mt-1" htmlFor='name'>
                          Feedback Type
                        </label>
                  </div>
                  <div className="form-outline mb-3">
                        <input placeholder="Awesome Website"
                          type="text" id="title" name='title' value={feedback.title}
                          style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)', fontSize:'1.1em' }}
                          className="form-control form-control-lg"
                          onChange={onChange}
                        />
                        <label className="form-label mt-1" htmlFor='title'>
                          Title
                        </label>
                      </div>
                  <div className="form-outline mb-3">
                  <textarea className="form-control form-control-lg" id="fdback" cols="30" rows="10" placeholder="Your Feedback Here" name="fdback" value={feedback.fdback}
                      style={{ border: '2px solid #adb5bd',boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1', height: '100px', fontSize:'1.1em'}} onChange={onChange}></textarea>
                    <label className="form-label mt-1" htmlFor='fdback'>
                      Your Feedback
                    </label>
                  </div>                
                 <div className="pt-1 mb-3">
                    <button className="btn btn-primary border border-3 btn-lg btn-block" type="submit">
                      Send Feedback
                    </button>
                  </div>
                  <p style={{ color: '#393f81' }}>
                      For any Queries?&nbsp; <Link style={{ color: '#393f81' }} to="/Contact">
                        Contact Us
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
