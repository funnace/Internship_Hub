import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from './Modal';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  let userType = localStorage.getItem('userType');

  let Path;
    if (userType === "provider") {
        Path = "/provider/List";
    } else if (userType === "user") {
        Path = "/user/List";
    } else if (userType === "admin") {
        Path = "/List";
    }else{
      Path = "/Front"
    }

  return (
    <>
  <div>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top`} style={{ height: "65px", fontSize: '1.1em', fontWeight: '600' }}>
          <div className="container-fluid" style={{backgroundColor: '#111111'}}>
            <Link className="navbar-brand" to="/" style={{fontSize: '1.4em'}}>InternshipHub</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
               <li className="nav-item mx-2">
                  <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                </li>
               {/* <li className="nav-item mx-2">
                  <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                </li> */}
               <li className="nav-item mx-2">
                  <Link className={`nav-link ${(location.pathname === "/List" || location.pathname === "/provider/List" || location.pathname === "/user/List") ? "active" : ""}`} to={`${Path}`}>Internship</Link>
                </li>
                { userType ==='user' ? <li className="nav-item mx-2">
                  <Link className={`nav-link ${location.pathname === "/Stats" ? "active" : ""}`} to={`${userType === 'user' ? "/Stats" : "#"}`}>
                  Stats
                  </Link>
                </li>: <></>}
               <li className="nav-item mx-2">
                  <Link className={`nav-link ${(location.pathname === "/Contact" || location.pathname === "/AdminContact" ) ? "active" : ""}`} to={`${userType === 'admin' ? "/AdminContact" : "/Contact"}`}>Contact</Link>
                </li>
                <li className="nav-item mx-2">
                <Link className={`nav-link ${(location.pathname === "/Feedback" || location.pathname === "/AdminFeedback" ) ? "active" : ""}`} to={`${userType === 'admin' ? "/AdminFeedback" : "/Feedback"}`}>Feedback</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={`nav-link ${location.pathname === "/Profile" ? "active" : ""}`} to={`${userType === 'admin' ? "#" : "/Profile"}`}>
                  {userType === 'admin' ? <i type="button" style={{color:'#e50914'}} data-bs-toggle="modal"
                    data-bs-target="#confirmationModal" className="fas fa-power-off"/> : <i className="fas fa-user"/>}
                  </Link>
                </li>
                {/* <li className="nav-item mx-2">
                  <Link className="nav-link" to="/Login">
                  <i style={{color:'#e50914'}} className="fas fa-power-off"/>
                  </Link>
                </li> */}
               {/* <li className="nav-item mx-2">
                  <Link className={`nav-link ${location.pathname === "/MemberReg" ? "active" : ""}`} to="/MemberReg">Member Registration</Link>
                </li> */}
                {/* <li className="nav-item dropdown mx-1">
                  <Link className={`nav-link ${location.pathname === "/AdminLogin" || location.pathname === "/AdminLogin" ? "active" : ""} dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/AdminLogin">Admin</Link></li>
                    <li><Link className="dropdown-item" to="/InternshipPro">Internship Provider</Link></li>
                  </ul>
                </li> */}
              </ul>
              {/* {localStorage.getItem('token')?<Link className='btn btn-danger mx-1' role="button" to="/login" onClick={logout}>Logout</Link>:""} */}
            </div>
          </div>
        </nav>
        <Modal body="Are you sure you want to Logout?"
                    work="Logout"
                    func={
                      () => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('id')
                        localStorage.removeItem('userType')
                        navigate("/Front")
                      }
                    } modalId="confirmationModal"
                    mode="danger" />
      </div>
    </>
  )
}

export default Navbar;
