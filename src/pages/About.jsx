import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const About = () => {

  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/Front")
    }
  }, [navigate])

  return (
    <div className="ms-5" style={{color: 'red',marginTop: '150px'}}>About</div>
  )
}
