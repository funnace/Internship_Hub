import React from 'react';
import { Link } from 'react-router-dom';

export const Front = () => {
  return (
    <>
      <div className='container'>
      {/* style={{color: 'white'}} */}
        <h3 className='pt-4 text-center text-white' >Welcome to InternshipHub!!!</h3>
        <h6 className='text-center text-white' >"Empowering Fresh Minds: Your Gateway to Internship Success!"</h6>
        <div className='row row-cols-md-2 justify-content-center'>
          <div className='mt-5 col d-flex justify-content-center align-items-center'>
          <Link to="/user/login">
            <div className="image-container position-relative text-center">
              <img src={`${process.env.PUBLIC_URL}/images/memreg.jpg`} alt="Background" className="img-fluid" style={{ width: '80%', height: 'auto' }} />
              <div className="overlay-text bg-dark text-white position-absolute w-0 bottom-0 p-1 px-4 d-flex justify-content-center align-items-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <p className="mb-0" style={{fontSize: '1.3rem'}}>User</p>
              </div>
            </div>
            </Link>
          </div>

          <div className='mt-5 col d-flex justify-content-center align-items-center'>
          <Link to="/provider/login">
            <div className="image-container position-relative text-center">
              <img src={`${process.env.PUBLIC_URL}/images/bg1.jpg`} alt="Background" className="img-fluid" style={{ width: '80%', height: 'auto' }} />
              <div className="overlay-text bg-dark text-white position-absolute w-0 bottom-0 p-1 px-3 d-flex justify-content-center align-items-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <p className="mb-0" style={{fontSize: '1.3rem'}}>Provider</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
