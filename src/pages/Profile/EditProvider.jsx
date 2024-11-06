import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EditProvider = (props) => {

    let navigate = useNavigate()

    const [formData, setFormData] = useState({
        // password: '',
        // email: '',
        username: '',
        companyname: '',
        pincode: '',
        city: '',
        state: '',
        skills: [],
      });
    
      const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    useEffect(() => {
        const fetchuser = async () => {
          try {
            const userType = localStorage.getItem('userType')
            const response = await axios.get(`http://localhost:5000/api/auth/${userType}/getuser`, {
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              }
            });
            setFormData({
              ...response.data,
            });
          } catch (error) {
            console.error("Error fetching Internship:", error);
          }
        };
      
        fetchuser();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userType = localStorage.getItem('userType')
          const response = await axios.put(`http://localhost:5000/api/auth/${userType}/edituser`, formData, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            } 
          }
        );
          console.log(response.data);
          if (response.data.success) {
            navigate('/Profile');
            props.showAlert('Profile Updated Successfully', 'success');
          }
        } catch (error) {
          console.error(error.response.data);     
            props.showAlert("Fill All the fields","danger")
        }
      };
  return (
    <div className='container' style={{marginTop: '15vh'}}>
    <div className='row mt-4 justify-content-center'>
    <div className='col-sm-2 ' style={{background:'#0a1e25',boxShadow:'5px 10px #dcd7cb', borderRadius: "8px 0 0 8px"}}>
 </div>  
<div className='col-sm-10' style={{  maxHeight :'80vh', maxWidth:'80vh', background:'#e6e6e6', boxShadow:'5px 10px #dcd7cb', borderRadius: "0 8px 8px 0"}}>
      <h2 className='mt-3 mb-4'>Edit <b style={{color:'#0a1e25'}}>Provider</b></h2>
      <form onSubmit={handleSubmit}>
      <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px'}}>Company Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
        </div>
       {/* <div className='row'>
         <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Email</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control form-label  rounded-2'  type="email" name="email" value={formData.email} onChange={handleChange} />
        </div> */}
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px'}}>Full Name</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
{/* 
        <div className='mt-2 col-sm-12'>
          <label style={{fontSize:'18px'}}>Password</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="password" name="password" value={formData.password} onChange={handleChange} />
        </div> */}



{/* 
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Password</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4 w-full form-control rounded-2'  type="password" name="password" value={formData.password} onChange={handleChange} />
        </div> */}
        
        {/* </div> */}
      
        <div className='row'>
       
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>State</label>
         
          <input  className ='border shadow-md border-grey-400 py-1 px-4  rounded-2 form-control'  type="text" name="state" value={formData.state} onChange={handleChange} />
         
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>City</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-3 w-full form-control rounded-2'  type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        
       
        </div>
        <div className='mt-2 col-sm-6'>
          <label style={{fontSize:'18px'}}>Pincode</label>
          <input  className ='border shadow-md border-grey-400 py-1 px-4  form-control  rounded-2' type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>
       
        <button style={{background:'#0a1e25',color:'white', marginBottom:'2rem'}}  className ='border shadow-md border-grey-400 py-1 px-4 w-full mt-3 rounded-4' type="submit">Submit</button>
      </form>
      </div>
        </div>
        </div>
  )
}
