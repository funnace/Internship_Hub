import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setId } from '../../../actions/idActions';

export const AdminFeedback = () => {

  // const dispatch = useDispatch();
  let navigate = useNavigate();

  const [provider, setProvider] = useState(false)
  const [FeedbackList, setFeedbackList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const getUserFeedbackList = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/comm/admin/fetchalluserfeedbacks",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        }
      );
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching FeedbackList:", error);
    }
  }, []);  

  const ProviderFeedbackList = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comm/admin/fetchallproviderfeedbacks", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching Applied FeedbackList:", error);
    }
  }
,[]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !provider) {
      getUserFeedbackList();
    }
    else if (token && provider) {
      ProviderFeedbackList();
    }
    else {
      navigate("/Front");
    }// eslint-disable-next-line
  }, [getUserFeedbackList, navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the array of items to display only the items for the current page 
  const currentItems = FeedbackList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalItems = FeedbackList.length;
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
              getUserFeedbackList();
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
              ProviderFeedbackList();
            }
            }>Provider</button>
          </div>
        </div>
      </div>
					<div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
					{currentItems.map((Feedback, index) => (
						<div key={index} className="col-sm-6 col-md-6 col-lg-3 mt-2 mb-5">
							<div className="card shadow h-100" style={{ backgroundColor: "#ffffff" }}>
								<div className="card-body">
									<div className="row">
										<div className="col-lg-3 mt-1 mb-1"><img className="img rounded-circle" alt='Feedback' src="https://imgs.search.brave.com/Mc4msrfKAd8LPPSBTri5ibY_EbBsawd_LI30BkBDoIY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMTAvRGVm/YXVsdC1Qcm9maWxl/LVBpY3R1cmUtUE5H/LUhpZ2gtUXVhbGl0/eS1JbWFnZS5wbmc" style={{
											borderRadius: '50px',
											height: '60px',
											width: '60px'
										}} /></div>
										<div className="col-lg-5 mt-1 mb-1">
											<b>{Feedback.username}</b>
											<p>{Feedback.userType}</p>
										</div>
										<div className="col-lg-4 mt-1 mb-1 ">
											
										</div>
									</div>
									<h5 className="card-title mt-2" style={{color: 'red'}}>{Feedback.feedbacktype}</h5>
									<h5 className="card-title mt-2" >"{Feedback.title}"</h5>
									<p className="card-text mt-3" style={{ fontWeight: "bold" }}>{Feedback.fdback}</p>
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