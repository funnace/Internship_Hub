import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import Filter from '../../../components/Filter';

export const AdminList = (props) => {
  let navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [Internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const getInternships = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/fetchallinternships", {
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
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') {
      getInternships();
    } else {
      navigate("/Front");
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
      console.log(id);
      await axios.delete(`http://localhost:5000/api/admin/deleteinternship/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const newInternship = Internships.filter((Internship) => { return Internship._id !== id })
      setInternships(newInternship)
    } catch (error) {
      console.error("Error deleting Internship:", error);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Internships.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalItems = Internships.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalPages > 1;

  return (
    <div className="container-fluid py-5 mt-5">
      <form className="d-flex mb-4" role="search">
        <input className="form-control mx-3 px-4" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} style={{ border: '3px solid aqua' }} />
      </form>
      <Filter setFilterType={setFilterType} filterType={filterType} />
      <div className="row row-cols-1 row-cols-md-4 gx-4">
        {currentItems.filter((item) => {
          return (search.toLowerCase() === '' ? true :
            item.position.toLowerCase().includes(search.toLowerCase()) ||
            item.companyname.toLowerCase().includes(search.toLowerCase()) ||
            item.city.some(city => city.toLowerCase().includes(search.toLowerCase())) ||
            item.internshiptype.toLowerCase().includes(search.toLowerCase()) ||
            item.stipend.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.openings.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))) &&
            (filterType === '' || item.internshiptype === filterType);
        }).length === 0 ? (
          <p className='text-white mx-3'>No items to display</p>
        ) : (
          currentItems.map((Internship, index) => (
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
                    <button type="button" className="btn btn-warning px-lg-4" onClick={() => {
                      localStorage.setItem('id', Internship._id)
                      navigate("/EditInternship");
                    }}>Edit</button>
                    <button
                      type="button"
                      className="btn btn-danger px-lg-3"
                      data-bs-toggle="modal"
                      data-bs-target="#adminconfirmationModal"
                      onClick={() => {
                        localStorage.setItem('id', Internship._id)
                      }}
                    >
                      Delete
                    </button>
                    <Modal body="Are you sure you want to delete?" work="Delete" func={() => {
                      handleDelete(localStorage.getItem('id'))
                      props.showAlert("Deleted Successfully", "success")
                    }} modalId="adminconfirmationModal" mode="danger" />
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
