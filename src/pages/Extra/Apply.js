import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Apply = (props) => {

  let navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    tenth: '',
    twelfth: '',
    DOB: '',
    languages: [],
    skills: [],
    diploma: '',
    resume: ''
  });
  

  const handleChange = (e) => {
    if (e.target.name === 'skills' || e.target.name === 'languages') {
        const arrayValue = e.target.value.split(',').map(item => item.trim());
        setFormData({ ...formData, [e.target.name]: arrayValue });
      }
    else if (e.target.name === 'deadline') {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
      if (e.target.value <= currentDate) {
        // If the input date is greater than or equal to the current date, update the deadline
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
      else{
        props.showAlert("The DOB cannot be greater than the current date","danger")
      } 
    }else {
      // For other input fields, update the state normally
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem('id')
      const response = await axios.post(
        `http://localhost:5000/api/application/user/apply/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem('token')
          } 
        }
      );
      if (response.data.success) {
        console.log(response.data);
        props.showAlert('Applied Successfully','success')      
        navigate("/user/List")
      }
    } catch (error) {
      console.error(error.response.data);
      props.showAlert("Fill All the fields", "danger");
    }
  };

  return (
    <div className='container'>
    <div className='row mt-4 justify-content-center '>
    <div className='col-sm-2 ' style={{background:'#0a1e25',boxShadow:'5px 10px #dcd7cb', borderRadius: "8px 0 0 8px"}}>
 </div>  
<div className='col-sm-10' style={{  maxHeight :'80vh', maxWidth:'80vh', background:'#e6e6e6', boxShadow:'5px 10px #dcd7cb', borderRadius: "0 8px 8px 0"}}>
      <h2 className='mt-3 mb-4'>Apply <b style={{color:'#0a1e25'}}>Internship</b></h2>
      <form onSubmit={handleSubmit}>
      <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px'}}>Full Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>10th Percentage</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control form-label  rounded-2'  name="tenth" value={formData.tenth} onChange={handleChange} />
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>12th Percentage</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2' type="number" name="twelfth" value={formData.twelfth} onChange={handleChange} />
        </div>




        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Diploma Percentage</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2' type="number" name="diploma" value={formData.diploma} onChange={handleChange} />
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>DOB</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2' type="date" name="DOB" value={formData.DOB} onChange={handleChange} />
        </div>
        </div>
      
        <div className='row'>
       
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Languages</label>
         
          <input  className ='border shadow-md border-grey-400 py-1 px-2  rounded-2 form-control'  type="text" name="languages" value={formData.languages.join(',')} onChange={handleChange} />
         
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Skills</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control  rounded-2' type="text" name="skills" value={formData.skills.join(',')} onChange={handleChange} />
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Uploard Resume</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control  rounded-2' type="file" name="resume" accept=".pdf,.docx" onChange={handleFileChange} />
        </div>
        </div>
       
        <button style={{background:'#0a1e25',color:'white',}}  className ='border shadow-md border-grey-400 py-1 px-4 w-full mt-3 rounded-4' type="submit">Submit</button>
        
      </form>
      </div>
        </div>
        </div>
  );
};