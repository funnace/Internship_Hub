import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddInternship = (props) => {

  const [formData, setFormData] = useState({
    companyname: '',
    position: '',
    internshiptype: '',
    desc: '',
    jd: '',
    city: [],
    skills: [],
    deadline: '',
    stipend: '',
    openings: '',
    other: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'skills') {
      const skillsArray = e.target.value.split(',').map(skill => skill.trim());
      setFormData({ ...formData, [e.target.name]: skillsArray });
    }
    else if (e.target.name === 'city') {
      const cityArray = e.target.value.split(',').map(city => city.trim());
      setFormData({ ...formData, [e.target.name]: cityArray });
    }
    else if (e.target.name === 'deadline') {
      const currentDate = new Date().toISOString().split('T')[0];
      if (e.target.value > currentDate) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
      else {
        props.showAlert("The Deadline cannot be less than the current date", "danger");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.skills || formData.skills.length === 0) {
      props.showAlert("Please provide required skills", "danger");
      return;
    }
    try {
      const authToken = localStorage.getItem('token');

      const response = await axios.post(
          'http://localhost:5000/api/provider/addinternship',
          formData,
          {
              headers: {
                  'auth-token': authToken
              }
          }
      );
            console.log(response.data);
      if (response.data.success) {
        let userType = localStorage.getItem('userType');
        if(userType === 'provider'){
        navigate('/provider/List');
        }
        else{
          navigate('/List');
        }
        props.showAlert('Internship Added Successfully', 'success');
      }
    } catch (error) {
      console.error(error.response.data);     
        props.showAlert("Fill All the fields","danger")
    }
  };  

  return (
    <div className='container mb-5'>
    <div className='row justify-content-center ' style={{marginTop: '12vh'}}>
    <div className='col-sm-2 ' style={{background:'#0a1e25',boxShadow:'5px 10px #dcd7cb', borderRadius: "8px 0 0 8px"}}>
 </div>  
<div className='col-sm-10 ' style={{maxHeight: '100h', maxWidth: '42vw', background:'#e6e6e6', boxShadow:'5px 10px #dcd7cb', borderRadius: "0 8px 8px 0"}}>
      <h2 className='mt-3 mb-4'>Add <b style={{color:'#0a1e25'}}>Internship</b></h2>
      <form onSubmit={handleSubmit}>
      <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Company Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-2 w-full form-control rounded-2'  type="text" name="companyname" value={formData.companyname} onChange={handleChange} placeholder="ABC Pvt. Ltd"/>
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Company Description</label>
          <textarea  className ='border shadow-md border-grey-400 py-1 px-2  form-control form-label  rounded-2' style={{height:'100px'}}  type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Company Decription ..."/>
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Postion</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-2 w-full form-control rounded-2'  type="text" name="position" value={formData.position} onChange={handleChange} placeholder="SDE"/>
        </div>

       
        <div className='mt-2 col-sm-6'>
        <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Category</label>
        <div className="select-box">
  <select  
    className='px-2 py-1 rounded' 
    name="internshiptype"
    style={{ 
      border: '2px solid #adb5bd',
      boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.1)',
      color: 'rgba(0, 0, 0, 0.7)'
    }}
    value={formData.internshiptype}
    onChange={handleChange}
  >
    <option value="" disabled>Select Category Type</option>
    <option value="Development & IT" style={{color: 'black'}}>Development & IT</option>
    <option value="Marketing & Sales" style={{color: 'black'}}>Marketing & Sales</option>
    <option value="Design & Creative" style={{color: 'black'}}>Design & Creative</option>
    <option value="Support & Admin" style={{color: 'black'}}>Support & Admin</option>
    <option value="Other" style={{color: 'black'}}>Other</option>
  </select>
</div>
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Cities</label>
         
          <input  className ='border shadow-md border-grey-400 py-1 px-2  rounded-2 form-control'  type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Add CSV"/>
         
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Openings</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-2  form-control  rounded-2' type="text" name="openings" value={formData.openings} onChange={handleChange} placeholder="10"/>
        </div>
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-6'> 
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>deadline:</label>
          <input className ='border shadow-md border-grey-400 py-1 px-2  form-control  rounded-2' type="date" name="deadline" value={formData.deadline} onChange={handleChange}/>
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Annual CTC</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-2  form-control  rounded-2' type="text" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="350000 format"/>
        </div>
        </div>
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Skills</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-2 w-full form-control rounded-2'  type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Add CSV"/>
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Job Description</label>
          <textarea  className ='border shadow-md border-grey-400 py-1 px-2  form-control form-label  rounded-2' style={{height:'100px'}}  type="text" name="jd" value={formData.jd} onChange={handleChange} placeholder="Add description in points {next line for next description}"/>
        </div>
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px', marginTop: '0.3rem'}}>Other Requirements</label>
          <textarea  className ='border shadow-md border-grey-400 py-1 px-2  form-control form-label  rounded-2' style={{height:'80px'}}  type="text" name="other" value={formData.other} onChange={handleChange} placeholder="Add description in points {next line for next description}"/>
        </div>
        </div>
       
        <button style={{background:'#0a1e25',color:'white', marginBottom: '2rem'}}  className ='border shadow-md border-grey-400 py-1 px-4 w-full mt-3 rounded-4' type="submit">Submit</button>
       
       
      </form>
      </div>
        </div>
        </div>
  );
};