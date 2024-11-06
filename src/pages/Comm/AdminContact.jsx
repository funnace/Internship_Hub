import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setId } from '../../../actions/idActions';

export const AdminContact = (props) => {

  // const dispatch = useDispatch();
  let navigate = useNavigate();

  const [provider, setProvider] = useState(false)
  const [ContactList, setContactList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const getUserContactList = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/comm/admin/fetchallusercontacts",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        }
      );
      setContactList(response.data);
    } catch (error) {
      console.error("Error fetching ContactList:", error);
      if (error.response && error.response.status === 403) {
        console.error("Unauthorized")
      }
    }
  }, []);

  const ProviderContactList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comm/admin/fetchallprovidercontacts", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      setContactList(response.data);
    } catch (error) {
      console.error("Error fetching Applied ContactList:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !provider) {
      getUserContactList();
    }
    else if (token && provider) {
      ProviderContactList();
    }
    else {
      navigate("/Front");
    }// eslint-disable-next-line
  }, [getUserContactList, navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the array of items to display only the items for the current page 
  const currentItems = ContactList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalItems = ContactList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalPages > 1;

  return (
    <div className="container-fluid py-5 mt-5">
      <div className="container">
        <div className="container">
          <div className="row justify-content-around">
            <button className="col-sm-5 p-1 mb-2 mx-2 border border-2 border rounded-2 d-flex justify-content-center" style={{
              fontSize: '25px',
              boxShadow: '5px 7px grey',
              backgroundColor: !provider ? 'yellow' : '',
              color: provider ? '#333' : '',
            }} onClick={() => {
              setProvider(false)
              setCurrentPage(1);
              getUserContactList();
            }
            }>User</button>
            <button className="col-sm-5 p-1 mb-2 mx-2 border border-2 border rounded-2 d-flex justify-content-center" style={{
              fontSize: '25px',
              boxShadow: '5px 7px grey',
              backgroundColor: provider ? 'yellow' : '',
              color: provider ? '#333' : '',
            }} onClick={() => {
              setProvider(true)
              setCurrentPage(1);
              ProviderContactList();
            }
            }>Provider</button>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
      {currentItems.map((Contact, index) => (
						<div key={index} className="col-sm-6 col-md-6 col-lg-3 mt-2 mb-5">
							<div className="card shadow h-100" style={{ backgroundColor: "#ffffff" }}>
								<div className="card-body">
									<div className="row">
										<div className="col-lg-3 mt-1 mb-1"><img className="img rounded-circle" alt='Feedback' src="https://imgs.search.brave.com/D9s5zAFOq-EMMiIZEBKViIiSTIV-zsw2tc0dfOPQbY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLW1vbmtl/eS1mYWNlLTBqeHdt/cTZicG0zaHM5Y2Iu/anBn" style={{
											borderRadius: '50px',
											height: '60px',
											width: '60px'
										}} /></div>
										<div className="col-lg-5 mt-1 mb-1">
											<b>{Contact.username}</b>
											<p>{Contact.userType}</p>
										</div>
										<div className="col-lg-4 mt-1 mb-1 ">
											
										</div>
									</div>
									<h6><b>Email: </b>{Contact.email}</h6>
									<h6><b>Phone: </b>{Contact.phone}</h6>
									<h6 className="card-title mt-2" ><b>Query: </b>{Contact.query}</h6>
								</div>
							</div>
						</div>
						))}
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