import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';

export const Profile = () => {

  let navigate = useNavigate();

  let token = localStorage.getItem('token');
  let userType = localStorage.getItem('userType');

  const [userData, setuserData] = useState({
    username: '',
    email: '',
    city: '',
    skills: [],
    pincode: '',
    state: ''
  });

  const fetchuser = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/${userType}/getuser`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      setuserData(response.data);
    } catch (error) {
      console.error("Error fetching Internship:", error);
    }
  }, [token, userType]);

  useEffect(() => {
    if (token) {
      fetchuser();
    } else {
      navigate("/Front");
    }
  }, [fetchuser, navigate, token]);

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-md-4 col-sm-5 mx-auto py-4 border border-3 rounded-3" style={{ marginTop: '8rem', boxShadow: '5px 10px #c0c0c0', backgroundColor: '#E8E8E8', fontSize: '1.3rem', width: '35vw' }}>
          <div className="body d-flex flex-column px-2">
            <div className='align-items-center mb-4 mx-auto'><img className='rounded-circle' src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg" width={100} height={95} alt="User Profile" /></div>
            <h2 className="title mb-2 mx-auto mb-2">{userType === 'user' ? `${userData.username}` : `${userData.companyname}`}</h2>
            <h6 className="subtitle mb-4 text mx-auto">Email: <span style={{ color: 'blue' }}>{userData.email}</span></h6>
            <div className="flex d-flex flex-wrap mt-3 mb-4 mx-4 justify-content-between">
              <span>
                <b>City: </b>{userData.city}
              </span>
              <span>
                <b>State: </b>{userData.state}
              </span>
              <span>
                <b>Pincode: </b>{userData.pincode}
              </span>
            </div>
            <span style={{ marginTop: '3px', marginBottom: '20px', marginLeft: '21px', marginRight: '21px' }}>
              <b>Creation Date:  </b>   {userData.date && userData.date.replace(/T.*/, '')}
            </span>
            {userType === 'user' ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '21px', marginRight: '21px' }}>
                <b style={{marginRight: '10px'}}>Skills:  </b>
                {userData.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={{ marginRight: '10px', marginBottom: '5px' }}>{skill}</span>
                ))}
              </div>
            ) : ""}
            <div className='my-3'>
              <button type="button" className="ms-3 btn btn-danger px-lg-4" data-bs-toggle="modal" data-bs-target="#confirmationModal">Logout</button>
              <button className="ms-3 btn btn-warning px-lg-3" onClick={() => {
                if (userType === 'user') {
                  navigate('/EditUser')
                }
                else if (userType === 'provider') {
                  navigate('/EditProvider')
                }
              }}><i type="button" className="fas fa-edit" /></button>
            </div>
          </div>
          <Modal body="Are you sure you want to Logout?"
            work="Logout"
            func={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('id')
              localStorage.removeItem('userType')
            }} modalId="confirmationModal"
            mode="danger" />
        </div>
      </div>
    </div>
  )
}