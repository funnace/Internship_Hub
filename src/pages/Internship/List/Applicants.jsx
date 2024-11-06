    import React, { useState, useEffect, useCallback } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import Modal from '../../../components/Modal';

    export const Applicants = (props) => {
      let navigate = useNavigate();

      const [Candidates, setCandidates] = useState([]);

      const [modalAction, setModalAction] = useState('');
      const [search, setSearch] = useState('');
      const [internshipId, setInternshipId] = useState();
      const [userId, setUserId] = useState();
      const [shortlisted, setShortlisted] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(12);

      const handleButtonClick = (action) => {
        setModalAction(action);
      };

      const handleConfirmAction = () => {
        if (modalAction === 'shortlist') {
          const shortlistCandidate = async () => {
            try {
              await axios.put(
                `http://localhost:5000/api/application/provider/Shortlisted/${internshipId}/${userId}`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                  }
                }
              );
              const newCandidates = Candidates.filter((Candidate) => Candidate.user !== userId);
              setCandidates(newCandidates);
              props.showAlert("Candidate ShortListed", 'success');
            } catch (error) {
              console.error("Error shortlisting Candidate:", error);
            }
          };

          shortlistCandidate()
        } else if (modalAction === 'reject') {
          const rejectCandidate = async () => {
            try {
              await axios.put(`http://localhost:5000/api/application/provider/Rejected/${internshipId}/${userId}`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                  }
                });
              const newCandidates = Candidates.filter((Candidate) => Candidate.user !== userId);
              setCandidates(newCandidates);
              props.showAlert("Candidate Rejected", 'danger')
            } catch (error) {
              console.error("Error fetching Candidates:", error);
            }
          };

          rejectCandidate();
        }
      };

      const getCandidates = useCallback(async () => {
        try {
          const id = localStorage.getItem('id');
          const response = await axios.get(`http://localhost:5000/api/application/provider/fetchPending/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          setCandidates(response.data);
        } catch (error) {
          console.error("Error fetching Candidates:", error);
        }
      }, []);

      const shortlistedCandidates = useCallback(async () => {
        try {
          const id = localStorage.getItem('id');
          const response = await axios.get(`http://localhost:5000/api/application/provider/fetchShortlisted/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          setCandidates(response.data);
        } catch (error) {
          console.error("Error fetching Candidates:", error);
        }
      }, []);

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !shortlisted) {
          getCandidates();
        } else if (token && shortlisted) {
          shortlistedCandidates();
        } else {
          navigate("/Front");
        }
      }, [getCandidates, navigate, shortlisted, shortlistedCandidates]);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = Candidates.slice(indexOfFirstItem, indexOfLastItem);
      const paginate = pageNumber => setCurrentPage(pageNumber);
      const totalItems = Candidates.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const showPagination = totalPages > 1;

      return (
        <div className="container-fluid py-5 mt-5">
          <div className="container mb-4">
            <div className="row justify-content-around">
              <button
                className="col-sm-5 p-1 mx-2 border border-2 border rounded-2 d-flex justify-content-center"
                style={{
                  fontSize: '25px',
                  boxShadow: '5px 7px grey',
                  backgroundColor: !shortlisted ? 'yellow' : '',
                  color: !shortlisted ? '#333' : '',
                }}
                onClick={() => {
                  setShortlisted(false);
                  setCurrentPage(1);
                  getCandidates();
                }}
              >
                New / Unmarked
              </button>
              <button
                className="col-sm-5 p-1 mx-2 border border-2 border rounded-2 d-flex justify-content-center"
                style={{
                  fontSize: '25px',
                  boxShadow: '5px 7px grey',
                  backgroundColor: shortlisted ? 'yellow' : '',
                  color: shortlisted ? '#333' : '',
                }}
                onClick={() => {
                  setShortlisted(true);
                  setCurrentPage(1);
                  shortlistedCandidates();
                }}
              >
                Shortlisted
              </button>
            </div>
          </div>
          <form className="d-flex mb-4" role="search">
            <input className="form-control mx-3 px-4" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} style={{ border: '3px solid aqua' }} />
          </form>
          <div className="row row-cols-1 row-cols-md-4 g-4" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            {currentItems.filter((item) => {
              return search.toLowerCase() === '' ? item :
                item.username.toLowerCase().includes(search) ||
                item.languages.some(city => city.toLowerCase().includes(search)) ||
                item.diploma.toString().toLowerCase().includes(search) ||
                new Date(item.DOB).toLocaleDateString('en-GB').toLowerCase().includes(search) ||
                item.course.toLowerCase().includes(search) ||
                item.specialization.toLowerCase().includes(search) ||
                item.CGPA.toString().toLowerCase().includes(search) ||
                item.skills.some(skill => skill.toLowerCase().includes(search));
            }).map((Candidate, index) => (
              <div key={index} className="col mb-4">
                <div className="ps-3 card h-100" style={{ borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 8px 6px rgba(0, 0, 0, 0.4)' }}>
                  <div className="card-body d-flex flex-column">
                    <span style={{ fontSize: '20px' }}><b>Name: </b><span>{Candidate.username}</span></span>
                    <span className='mt-2' ><b style={{ fontSize: '16px', marginBottom: '20px' }}>10<sup>th </sup>:</b> {parseFloat(Candidate.tenth.$numberDecimal).toFixed(2)}%</span>
                    <div className="col flex d-flex flex-wrap" >
                      {!isNaN(parseFloat(Candidate.twelfth.$numberDecimal)) && (<span className='mt-2' ><b style={{ fontSize: '16px', marginBottom: '20px' }}>12<sup>th </sup>:</b> {parseFloat(Candidate.twelfth.$numberDecimal).toFixed(2)}%</span>)}
                      {!isNaN(parseFloat(Candidate.diploma.$numberDecimal)) && (<span className='mt-2' ><b style={{ fontSize: '16px', marginBottom: '20px', marginLeft: '40px' }}>Diploma : </b> {parseFloat(Candidate.diploma.$numberDecimal).toFixed(2)}%</span>)}
                    </div>
                    <span><b style={{ fontSize: '16px', marginBottom: '20px', marginRight: '9px' }}>Languages: </b>{Candidate.languages.map((language, languageIndex) => (
                      <li key={languageIndex} style={{ display: 'inline', marginRight: '9px', whiteSpace: 'nowrap' }}>{language}</li>
                    ))}</span>
                      <span style={{ fontSize: '16px' }}><b>Course: </b><span>{Candidate.course}</span></span>
                      <span style={{ fontSize: '16px'}}><b>Specialization: </b><span>{Candidate.specialization}</span></span>
                    <span style={{ fontSize: '16px' }}><b>C.G.P.A: </b><span>{parseFloat(Candidate.CGPA.$numberDecimal).toFixed(2)}</span></span>

                    <span className='mt-2' ><b style={{fontSize:'16px',marginBottom:'20px'}}>D.O.B:</b> {new Date(Candidate.DOB).toLocaleDateString('en-GB')}</span>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      <b>Skills: </b>
                      {Candidate.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} style={{ display: 'inline', marginRight: '10px', whiteSpace: 'nowrap' }}>{skill}</li>
                      ))}
                    </ul>

                    <div className="d-flex justify-content-evenly">
                      {/* Resume button */}
                      <div className="d-flex flex-column align-items-center">
                        <i
                          className="fas fa-eye"
                          style={{ color: 'blue', fontSize: '1.6rem' }}
                          onClick={() => {
                            window.open(`http://localhost:5000/uploads/${Candidate.filename}`);
                          }}
                        />
                        <span>Resume</span>
                      </div>

                      {/* Shortlist button */}
                      {!shortlisted && (
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="fas fa-clipboard-check"
                            data-bs-toggle="modal"
                            data-bs-target="#applicationconfirmationModal"
                            style={{ color: 'green', fontSize: '1.7rem' }}
                            onClick={() => {
                              handleButtonClick('shortlist');
                              setInternshipId(Candidate.internshipId);
                              setUserId(Candidate.user);
                            }}
                          />
                          <span>Shortlist</span>
                        </div>
                      )}

                      {/* Reject button */}
                      {!shortlisted && (
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="fas fa-trash"
                            data-bs-toggle="modal"
                            data-bs-target="#applicationconfirmationModal"
                            style={{ color: 'red', fontSize: '1.6rem' }}
                            onClick={() => {
                              handleButtonClick('reject');
                              setInternshipId(Candidate.internshipId);
                              setUserId(Candidate.user);
                            }}
                          />
                          <span>Reject</span>
                        </div>
                      )}
                    </div>


                    {/* <button   disabled   type="button"   className="btn btn-warning"  style={{ opacity: 1 }}>ShortListed</button>  */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal 
      body={modalAction === 'shortlist' ? 'ShortList the Candidate?' : 'Reject the Candidate?'} 
      work={modalAction === 'shortlist' ? 'ShortList' : 'Reject'} 
      func={() => handleConfirmAction()} 
      modalId="applicationconfirmationModal"  
      mode={modalAction === 'shortlist' ? 'success' : 'danger'}
    />      <div className="modal fade" id="applicationconfirmationModal" tabIndex="-1" aria-labelledby="applicationconfirmationModalLabel">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="applicationconfirmationModalLabel">Confirmation</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                {modalAction === 'shortlist' ? 'ShortList' : 'Reject'} the Candidate?
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className={`btn btn-${modalAction === 'shortlist' ? 'success' : 'danger'}`} onClick={() => {
                    handleConfirmAction()
                  }}>{modalAction === 'shortlist' ? 'ShortList' : 'Reject'}</button>
                </div>
                </div>
              </div>
          </div>
          {showPagination && (
            <div className="d-flex justify-content-center">
              <nav aria-label="Pagination">
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>)}
        </div>
      );
    };