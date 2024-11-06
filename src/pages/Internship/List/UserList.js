import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Filter from '../../../components/Filter';

export const UserList = () => {
  let navigate = useNavigate();

  const [apply, setApply] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [Internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const getInternships = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/fetchRecommendations",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        }
      );
      setInternships(response.data.matched_internships.map(item => item.internship));
    } catch (error) {
      console.error("Error fetching Internships:", error);
    }
  }, []);

  const appliedInternships = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/application/user/fetchapplied", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      setInternships(response.data);
    } catch (error) {
      console.error("Error fetching Applied Internships:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token && userType === 'user') {
      if (apply) {
        appliedInternships();
      } else {
        getInternships();
      }
    } else {
      navigate("/user/login");
    }
  }, [getInternships, appliedInternships, apply, navigate]);

  useEffect(() => {
    const filter = localStorage.getItem('filterType');
    if (filter) {
      setFilterType(filter);
    }
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Internships.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalItems = Internships.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalPages > 1;

  const filteredInternships = currentItems.filter((item) => {
    const matchesSearch = search.toLowerCase() === '' ||
      item.position.toLowerCase().includes(search.toLowerCase()) ||
      item.companyname.toLowerCase().includes(search.toLowerCase()) ||
      item.city.some(city => city.toLowerCase().includes(search.toLowerCase())) ||
      item.internshiptype.toLowerCase().includes(search.toLowerCase()) ||
      item.stipend.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.openings.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()));
    const matchesFilterType = filterType === '' || item.internshiptype === filterType;
    return matchesSearch && matchesFilterType;
  });

  const currentFilteredItems = filteredInternships.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-fluid py-5 mt-5">
      <form className="d-flex mb-5" role="search">
        <input
          className="form-control mx-3 px-4"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{ border: '3px solid aqua' }}
        />
      </form>
      <div className="container">
        <div className="container">
          <div className="row justify-content-around">
            <button
              className="col-sm-5 p-1 mb-2 mx-2 border border-2 border rounded-2 d-flex justify-content-center"
              style={{
                fontSize: '25px',
                boxShadow: '5px 7px grey',
                backgroundColor: !apply ? 'yellow' : '',
                color: apply ? '#333' : '',
              }}
              onClick={() => {
                setApply(false);
                setCurrentPage(1);
                getInternships();
              }}
            >
              All
            </button>
            <button
              className="col-sm-5 p-1 mb-2 mx-2 border border-2 border rounded-2 d-flex justify-content-center"
              style={{
                fontSize: '25px',
                boxShadow: '5px 7px grey',
                backgroundColor: apply ? 'yellow' : '',
                color: apply ? '#333' : '',
              }}
              onClick={() => {
                setApply(true);
                setCurrentPage(1);
                appliedInternships();
              }}
            >
              Applied
            </button>
          </div>
        </div>
      </div>
      <Filter setFilterType={setFilterType} filterType={filterType} />
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-1" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        {currentFilteredItems.length === 0 ? (
          <p className='text-white mx-3'>No items to display</p>
        ) : (
          currentFilteredItems.map((Internship, index) => (
            <div key={index} className="col-sm-6 col-md-6 col-lg-3 mt-2 mb-5">
              <div className="card h-100" style={{ width: '100%', borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 2px 4px 2px rgba(13, 13, 13, 0.5)', transition: 'boxShadow 0.3s out', backgroundColor: '#ffffff' }}>
                <div className="card-body d-flex flex-column justify-content-center ps-4 py-1">
                  <h2 className="card-title mt-2" style={{ fontSize: '25px' }}>{Internship.position}</h2>
                  <h6 className="card-subtitle mb-2 text-white-muted" style={{ fontSize: '20px', color: 'gold' }}>{Internship.companyname}</h6>
                  <span><i className="fas fa-map-marker-alt" style={{ fontSize: '16px' }} /> {Internship.city.map((city, cityIndex) => (
                    <li key={cityIndex} style={{ display: 'inline', marginRight: '16px', whiteSpace: 'nowrap' }}>{city}</li>
                  ))}</span>
                  <span className='mt-2'>
                    <b style={{ fontSize: '16px', marginBottom: '20px' }}>Type:</b> {Internship.internshiptype}
                  </span>
                  <div className="col flex d-flex flex-wrap">
                    <span className=''>
                      <b style={{ fontSize: '16px', marginBottom: '20px' }}>Stipend:</b> &#8377;{Internship.stipend}
                    </span>
                    <span>
                      <b style={{ fontSize: '16px', marginBottom: '20px', marginLeft: '40px' }}>Openings:</b> {Internship.openings}
                    </span>
                  </div>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <b style={{ fontSize: '16px', marginTop: '5px' }}>Skills: </b>
                    {Internship.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} style={{ display: 'inline', marginRight: '10px', whiteSpace: 'nowrap' }}>{skill}</li>
                    ))}
                  </ul>
                  <div className='d-flex justify-content-center'>
                    {!apply ? (
                      <button type="button" className="btn btn-primary" onClick={() => {
                        localStorage.setItem('id', Internship.mongo_id)
                        navigate("/Internship")
                      }}>
                        Apply Now
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`btn ${Internship.status === 'Shortlisted' ? 'btn-success mb-2' : Internship.status === 'Rejected' ? 'btn-danger mb-2' : 'btn-warning mb-2'}`}
                      >
                        Status: {Internship.status}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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