import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
    const userType = localStorage.getItem('userType')
    return (
        <div>
            <div className="container-fluid my-5 fixed-footer" >

                <footer
                    className="text-center text-lg-start text-white"
                    style={{ backgroundColor: "#111111" }}
                >

                    <div className="container">

                        <section>

                            <div className="row">

                                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-5">
                                    <h6 className="text-uppercase mb-4 font-weight-bold " style={{color:'#b1d810'}}>
                                        Internship Hub
                                    </h6>
                                    <p>
                                       Internship Hub is a career-tech platform helping college students and freshers to get the best start to their career.
                                    </p>
                                </div>


                                <hr className="w-100 clearfix d-md-none" />


                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-5">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Join Us</h6>
                                    <p>
                                        <Link to={`/${userType}/List`} className="text-white">Internships</Link>
                                    </p>
                                    <p>
                                        <Link to={`/${userType}/List`} className="text-white">Jobs</Link>
                                    </p>
                                    {/* <p>
                                        <Link href="/" className="text-white"></Link>
                                    </p>
                                    <p>
                                        <Link href="/" className="text-white"></Link>
                                    </p> */}
                                </div>


                                <hr className="w-100 clearfix d-md-none" />


                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-5">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">
                                        <Link to="/About" >About Us</Link>
                                    </h6>
                                    {/* <p>
                                        <Link href="/" className="text-white"></Link>
                                    </p> */}
                                    <p>
                                        <Link href="/" className="text-white">Hire interns</Link>
                                    </p>
                                    <p>
                                        <Link href="/" className="text-white">Our Services</Link>
                                    </p>
                                    <p>
                                        <Link to="/ContactUs" className="text-white">Help</Link>
                                    </p>
                                </div>


                                <hr className="w-100 clearfix d-md-none" />


                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-5">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact Us</h6>
                                    <p className=''><FontAwesomeIcon icon={faHouse} /> Lucknow,Uttar Pradesh India</p>
                                    <p><FontAwesomeIcon icon={faEnvelope} /> internshiphub@gmail.com</p>
                                    <p><FontAwesomeIcon icon={faPhone} /> +917651992040</p>
                                    <p><FontAwesomeIcon icon={faPrint} /></p>
                                </div>

                            </div>

                        </section>

                        <hr className="my-3" />

                        <section className="p-3 pt-0">
                            <div className="row d-flex align-items-center">

                                <div className="col-md-7 col-lg-8 text-center text-md-start">

                                    <div className="p-3">
                                        ©Copyright 2024 
                                        <Link className="text-white" to="#"
                                        > InternshipHub.com</Link
                                        >
                                    </div>
                                </div>

                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">

                                    <Link to="#"
                                        className="btn btn-outline-light btn-floating m-1 text-white"
                                        role="button"
                                    ><FontAwesomeIcon icon={faFacebook} /></Link>


                                    <Link to="#"
                                        className="btn btn-outline-light btn-floating m-1"

                                        role="button"
                                    ><FontAwesomeIcon icon={faTwitter} /></Link>


                                    <Link to="#"
                                        className="btn btn-outline-light btn-floating m-1"
                                        role="button"
                                    ><FontAwesomeIcon icon={faGoogle} />
                                    </Link>


                                    <Link to="#"
                                        className="btn btn-outline-light btn-floating m-1"
                                        role="button"
                                    ><FontAwesomeIcon icon={faInstagram} /></Link>
                                </div>

                            </div>
                        </section>

                    </div>

                </footer>

            </div>
        </div>
    )
}