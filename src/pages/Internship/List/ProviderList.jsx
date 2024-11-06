import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../../components/Modal';
import Filter from '../../../components/Filter';

export const ProviderList = (props) => {
  let navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [expired, setExpired] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const getInternships = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/provider/fetchinternships", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      setInternships(response.data);
    } catch (error) {
      console.error("Error fetching Internships:", error);
    }
  }, []);

  const getExpiredInternships = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/provider/fetchexpiredinternships", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      setInternships(response.data);
    } catch (error) {
      console.error("Error fetching Internships:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token && userType === 'provider') {
      getInternships();
    } else {
      navigate("/provider/login");
    }
  }, [getInternships, navigate]);

  useEffect(() => {
    const filter = localStorage.getItem('filterType');
    if (filter) {
      setFilterType(filter);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      if (localStorage.getItem('userType') === 'provider') {
        await axios.delete(`http://localhost:5000/api/provider/deleteinternship/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const newInternship = internships.filter((internship) => internship._id !== id);
        setInternships(newInternship);
      }
    } catch (error) {
      console.error("Error fetching Internships:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = internships.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalItems = internships.length;
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
        <div className="container mb-4">
          <div className="row justify-content-around">
            <button
              className="col-sm-5 p-1 mb-2 mx-2 border border-2 border rounded-2 d-flex justify-content-center"
              style={{
                fontSize: '25px',
                boxShadow: '5px 7px grey',
                backgroundColor: !expired ? 'yellow' : '',
                color: expired ? '#333' : '',
              }}
              onClick={() => {
                setExpired(false)
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
                backgroundColor: expired ? 'yellow' : '',
                color: expired ? '#333' : '',
              }}
              onClick={() => {
                setExpired(true)
                setCurrentPage(1);
                getExpiredInternships();
              }}
            >
              Expired
            </button>
          </div>
        </div>
      </div>
      <Filter setFilterType={setFilterType} filterType={filterType} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2">
        <div className="col mb-4 d-flex flex-column align-items-center justify-content-center">
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{
              color: 'white',
              height: '27%',
              width: '27%',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} // Increase size on hover
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset size on mouse leave
            onClick={() => navigate("/AddInternship")}
          />
          <p style={{ marginTop: '10px', color: 'white' }}>ADD INTERNSHIP</p>
        </div>

        {filteredInternships.length === 0 ? (
          <p className='text-white mx-3'>No items to display</p>
        ) : (
          filteredInternships.map((Internship, index) => (
            <div key={index} className="col-sm-6 col-md-6 col-lg-3 mt-2 mb-5">
              <div className="card h-100" style={{ width: '100%', borderRadius: '1rem', borderColor: '#adb5bd', boxShadow: '2px 2px 4px 2px rgba(13, 13, 13, 0.5)', transition: 'boxShadow 0.3s out', backgroundColor: '#ffffff' }}>
                <div className="card-body d-flex flex-column justify-content-center ps-4 py-1">
                  <h2 className="card-title mt-2" style={{ fontSize: '25px' }}>{Internship.position}</h2>
                  <h6 className="card-subtitle mb-2 text-white-muted " style={{ fontSize: '20px', color: 'gold' }}>{Internship.companyname}</h6>
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
                  <div className='d-flex justify-content-around'>
                    <button onClick={() => {
                      localStorage.setItem('id', Internship._id)
                      navigate("/Applicants");
                    }}
                      style={{ fontSize: '25px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', color: 'blue' }}>
                      <FontAwesomeIcon icon={faUser} />
                      <p style={{ fontSize: '16px' }}>Applicants</p>
                    </button>

                    <button onClick={() => {
                      localStorage.setItem('id', Internship._id)
                      navigate("/EditInternship");
                    }}
                      style={{ fontSize: '25px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', color: 'green' }}>
                      <FontAwesomeIcon icon={faPencil} />
                      <p style={{ fontSize: '16px' }}>Edit</p>
                    </button>
                    <button type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteconfirmationModal"
                      onClick={() => {
                        localStorage.setItem('id', Internship._id)
                      }}
                      style={{ fontSize: '25px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', color: 'red' }}>
                      <FontAwesomeIcon icon={faTrash} />
                      <p style={{ fontSize: '16px' }}>Delete</p>

                    </button>
                    <Modal body="Are you sure you want to delete?"
                      work="Delete"
                      func={
                        () => {
                          handleDelete(localStorage.getItem('id'))
                          props.showAlert("Deleted Successfully", "success")
                        }
                      } modalId="deleteconfirmationModal"
                      mode="danger" />
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
        </div>
      )}
    </div>
  );
};