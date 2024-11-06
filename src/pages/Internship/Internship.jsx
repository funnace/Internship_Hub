import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Internship = () => {
  
  const handleClick = () =>{
    navigate('/Apply') 
  }

  let navigate = useNavigate();

  const [internshipData, setInternshipData] = useState({
    companyname: '',
    position: '',
    internshiptype: '',
    desc: '',
    jd: '',
    city: [],
    skills: [],
    deadline: '',
    stipend: '',
    openings: ''
  });

  const fetchInternship = useCallback(async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:5000/api/user/fetchinternship/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      console.log("Response data:", response.data);
      setInternshipData(response.data);
    } catch (error) {
      console.error("Error fetching Internship:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchInternship();
    } else {
      navigate("/Front");
    }
  }, [fetchInternship, navigate]); 

  return (
    <div className="container py-5 d-flex justify-content-center" style={{marginTop: '2rem'}}>
      <div className="px-5 py-3 h-100" style={{ width:'73.75%', borderRadius: '1rem', borderColor: '#adb5bd', border: '1px solid', backgroundColor: "white" }}>
        <div className="body d-flex flex-column">
          <h2 className="title mb-2">{internshipData.position}</h2>
          <h6 className="subtitle mb-4 text-muted">{internshipData.companyname}</h6>
          <span>
            <i className="fas fa-map-marker-alt" /> {internshipData.city.map((city, cityIndex) => (
              <li key={cityIndex} style={{ display: 'inline', marginRight: '9px', whiteSpace: 'nowrap' }}>{city}</li>
            ))}
          </span>
          <div className="flex d-flex flex-wrap mt-3 mb-5 justify-content-between">
            <span>
              <b>Type: </b>{internshipData.internshiptype}
            </span>
            <span>
              <b>Stipend:</b> &#8377;{internshipData.stipend}
            </span>
            <span>
              <b>Openings: </b>{internshipData.openings}
            </span>
            <span style={{marginRight: '8rem'}}>
              <b>Deadline:</b> {internshipData.deadline.replace('T00:00:00.000Z','')}
            </span>
          </div>
          <h4><b>Job Description</b></h4>
          <h6 className='text-muted'>Key Resposibilities</h6>
          <div>
            <pre>{internshipData.jd}</pre>
          </div>
          <ul style={{ listStyleType: 'none', padding: 0 }}> 
            <b>Required Skills: </b>
            {internshipData.skills.map((skill, skillIndex) => (
              <li key={skillIndex} style={{ display: 'inline', marginRight: '25px', marginLeft: '10px', whiteSpace: 'nowrap' }}>{skill}</li>
            ))}
          </ul>
          {internshipData.other && (
        <div>
          <h5 className='mt-3'><b>Other Requirements</b></h5>
          <p style={{ whiteSpace: 'normal' }}>
            {internshipData.other}
          </p>
        </div>
      )}
          <h4 className='mt-3'><b>About Company</b></h4>
          <p style={{ whiteSpace: 'normal' }}>
            {internshipData.desc}
          </p>
          <div className='d-flex justify-content-center my-3'>
            <button type="button" className="btn btn-primary px-3" onClick={()=>handleClick()}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};