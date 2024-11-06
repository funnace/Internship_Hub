import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const ProviderReg = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    companyname: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    skills: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/provider/createuser', formData);
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('userType', response.data.userType)
        navigate('/');
        props.showAlert('Account Created Successfully', 'success');
      }
    } catch (error) {
      console.error(error.response.data);
      props.showAlert("Fill All the fields", "danger")
    }
  };

  return (
    <div className='container'>
    <div className='row mt-4 justify-content-center '>
    <div className='col-sm-2 ' style={{background:'#0a1e25',boxShadow:'5px 10px #dcd7cb', borderRadius: "8px 0 0 8px"}}>
 </div>  
<div className='col-sm-10' style={{  maxHeight :'80vh', maxWidth:'80vh', background:'#e6e6e6', boxShadow:'5px 10px #dcd7cb', borderRadius: "0 8px 8px 0"}}>
      <h2 className='mt-3 mb-4'>Create <b style={{color:'#0a1e25'}}>Provider</b></h2>
      <form onSubmit={handleSubmit}>
      <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px'}}>Company Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
        </div>
        <div className='row'>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Email</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control form-label  rounded-2'  type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Full Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>




        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Password</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>City</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        </div>
      
        <div className='row'>
       
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>State</label>
         
          <input  className ='border shadow-md border-grey-400 py-1 px-2  rounded-2 form-control'  type="text" name="state" value={formData.state} onChange={handleChange} />
         
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Pincode</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control  rounded-2' type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>
       
        </div>
       
        <button style={{background:'#0a1e25',color:'white',}}  className ='border shadow-md border-grey-400 py-1 px-4 w-full mt-3 rounded-4' type="submit">Submit</button>
        <p className='mt-3 mb-5' style={{ color: '#393f81' }}>
          Already have an account?&nbsp;
          <Link style={{ color: '#393f81', }} to="/provider/login">
            Login here
          </Link><br/>
          <span style={{ color: '#393f81' }}>
Register as an User!&nbsp;
<Link style={{ color: '#393f81' }} to="/user/register">
  Register here
</Link>
</span>
        </p>
      </form>
      </div>
        </div>
        </div>
  );
};