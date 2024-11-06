import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const Home = () => {

	let navigate = useNavigate();

	const userType = localStorage.getItem('userType')

	const [internships, setInternships] = useState([])
	const [userFeedbackList, setUserFeedbackList] = useState([])
	const [providerFeedbackList, setProviderFeedbackList] = useState([])

	const handleClick = (type) => {
		localStorage.setItem('filterType', type);
	};

	const getUserFeedbackList = useCallback(async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/comm/fetchalluserfeedbacks",
				{
					headers: {
						"Content-Type": "application/json",
						"auth-token": localStorage.getItem('token')
					}
				}
			);
			setUserFeedbackList(response.data.slice(0, 3));
		} catch (error) {
			console.error("Error fetching FeedbackList:", error);
		}
	}, []);

	const ProviderFeedbackList = useCallback(async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/comm/fetchallproviderfeedbacks", {
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem('token')
				}
			});
			setProviderFeedbackList(response.data.slice(0, 3));
		} catch (error) {
			console.error("Error fetching Applied FeedbackList:", error);
		}
	}
		, []);

	const fetchInternships = useCallback(async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/user/fetchallinternships", {
				headers: {
					"Content-Type": "application/json",
				}
			});
			console.log(response.data)
			setInternships(response.data.slice(0, 4));
		} catch (error) {
			console.error("Error fetching Applied Internships:", error);
		}
	}, [])

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate("/")
		}
	}, [navigate])

	useEffect(() => {
		fetchInternships();
		getUserFeedbackList();
		ProviderFeedbackList();
	}, [getUserFeedbackList, ProviderFeedbackList, fetchInternships, navigate]);

	return (
		<div className='text-light' style={{ background: "black" }} >
			<div className="container-fuild text-white">
				<div className="container-fluid text-white" style={{ background: "black" }}>
					<div className="row text-light">
						<div className="col-lg-1"></div>
						<div className="col-lg-5">
							<div className="row">
								<div className="text-justify heading col-12">
									<h2 style={{ fontSize: "40px", marginTop: "10rem" }}>Got <span style={{ color: "gold" }}>Talent?</span></h2>
									<h1 className="mb-2" style={{ fontSize: "50px" }}>Meet <span style={{ color: "gold" }}>Opportunity</span></h1>
									<h5>Companies reviews, Salaries, Interviews, Jobs</h5>
								</div>
								<div className="row mt-4">
									<p style={{ color: "gold" }}>Trusted by leading brands and startups</p>
									<div className="row mt-1 mb-5">
										<div className="col-4"><i className="far fa-square"></i> Square</div>
										<div className="col-4"><i className="fas fa-file-alt"></i> Notion</div>
										<div className="col-4"><i className="fab fa-github"></i> Github</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-5 d-flex align-items-center" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
							<img src="/images/Women-entrepreneurs.jpg" alt='Background' className="img-fluid mx-auto shadow-light" style={{
								borderRadius: '50px',
								maxHeight: '500px'
							}} />
						</div>
						<div className="col-lg-1"></div>
					</div>
				</div>

				<div className="container mt-4 mb-5 text-white ">
					<div className="row d-flex justify-content-evenly">
						<div className="col-sm-6 gy-4">
							<div className="card shadow">
								<div className="card-body" style={{ backgroundColor: "#E8E8E8" }}>
									<h5 className="card-title">For Employers</h5>
									<p className="card-text" style={{ fontWeight: "bold" }}>Find professionals from around the world and across all skills</p>
									<Link className="btn btn-success" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }} to="/provider/List">Post jobs for Free</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-6 gy-4">
							<div className="card shadow">
								<div className="card-body" style={{ backgroundColor: "#E8E8E8" }}>
									<h5 className="card-title">For Candidate</h5>
									<p className="card-text" style={{ fontWeight: "bold" }}>Build your professional profile,find new job opportunities</p>
									<Link className="btn btn-success" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }} to="/user/List">Find Job Opportunities</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-6 gy-4">
							<div className="card shadow">
								<div className="card-body" style={{ backgroundColor: "#E8E8E8" }}>
									<h5 className="card-title">For Candidate</h5>
									<p className="card-text" style={{ fontWeight: "bold" }}>See Data Insights to make informed Decisions</p>
									<Link className="btn btn-success" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }} to="/Stats">See Data Insights</Link>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div className="container mt-5 mb-5 text-light">
					<div className="text-center" style={{ marginRight: '5px' }}>
						<h2><b>Popular<span style={{ color: '#047558' }}> category</span></b></h2>
						<p className="text-light">Get Interesting insights, articles,and news</p>
					</div>
					<div className="row">
						<div className="col-sm-3 gy-4 col-md-3 gy-2">
							<Link to={`/${userType}/List`} onClick={() => { handleClick('Development & IT') }} style={{ textDecoration: 'none' }}>
								<div className="card shadow" style={{ maxWidth: "100%", backgroundColor: "#E8E8E8" }}>
									<div className="card-body">
										<button className="btn" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }}>
											<i className="fas fa-code" style={{ color: "white" }}></i>
										</button>
										<h5 className="card-title mt-2">Development & IT</h5>
										<p> Jobs</p>
									</div>
								</div>
							</Link>
						</div>

						<div className="col-sm-3 gy-4 col-md-3 gy-2">
							<Link to={`/${userType}/List`} onClick={() => { handleClick('Marketing & Sales') }} style={{ textDecoration: 'none' }}>
								<div className="card shadow" style={{ maxWidth: "100%", backgroundColor: "#E8E8E8" }}>
									<div className="card-body">
										<button className="btn" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }}>
											<i className="fas fa-virus" style={{ color: "white" }}></i>
										</button>
										<h5 className="card-title mt-2">Marketing & Sales</h5>
										<p> Jobs</p>
									</div>
								</div>
							</Link>
						</div>

						<div className="col-sm-3 gy-4 col-md-3 gy-2">
							<Link to={`/${userType}/List`} onClick={() => { handleClick('Design & Creative') }} style={{ textDecoration: 'none' }}>
								<div className="card shadow" style={{ maxWidth: "100%", backgroundColor: "#E8E8E8" }}>
									<div className="card-body">
										<button className="btn" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }}>
											<i className="fas fa-palette" style={{ color: "white" }}></i>
										</button>
										<h5 className="card-title mt-2">Design & Creative</h5>
										<p> Jobs</p>
									</div>
								</div>
							</Link>
						</div>

						<div className="col-sm-3 gy-4 col-md-3 gy-2">
							<Link to={`/${userType}/List`} onClick={() => { handleClick('Support & Admin') }} style={{ textDecoration: 'none' }}>
								<div className="card shadow" style={{ maxWidth: "100%", backgroundColor: "#E8E8E8" }}>
									<div className="card-body">
										<button className="btn" style={{ backgroundColor: "#047558", borderRadius: "40px", color: "white" }}>
											<i className="fas fa-headphones" style={{ color: "white" }}></i>
										</button>
										<h5 className="card-title mt-2">Support & Admin</h5>
										<p> Jobs</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="container mt-5 ">
				<div style={{ marginRight: '5px' }}>
					<h2><b>Latest<span style={{ color: '#047558' }}> Jobs</span></b></h2>
				</div>
				<div className="row">
					{internships.map((Internship, index) => (
						<div key={index} className="col-sm-6 gy-4 col-md-6 gy-2">
							<Link to='/Internship' style={{ textDecoration: 'none' }} onClick={
								() => {
									localStorage.setItem('id', Internship._id)
								}}>
								<div className="card shadow" style={{ backgroundColor: '#E8E8E8' }}>
									<div className="card-body">
										<h5 className="card-title"><button className="btn1 text-light" style={{ backgroundColor: "#3d52fe", borderRadius: "50%", border: "none", marginRight: "5px" }}>
											<b>!!!</b> </button>{Internship.position}</h5>
										<h6 className="card-subtitle text-muted" style={{ marginLeft: "40px" }}>by <span className="b" style={{ color: "black", backgroundColor: "#faeeff", borderRadius: "20px", borderColor: "purple" }}>{Internship.companyname}</span> in <b className="a" style={{ color: "#047558" }}>{Internship.internshiptype}</b></h6><br />
										<button className="px-2" style={{ borderRadius: '20px', borderColor: "#047558", color: "#047558" }}><i className="fa-solid fa-location-dot"> </i> {Internship.city[0]} </button>
										<button className="px-2" style={{ borderRadius: '20px', borderColor: "#047558", color: "#047558" }}> &#8377;{Internship.stipend}l.p.a </button>
										<h6 className="card-subtitle ml-2 text-muted" style={{ marginTop: "20px" }}> <b className="a" style={{ color: "#047558" }}> {Internship.deadline && Internship.deadline.replace(/T.*/, '')} </b>Last day to apply</h6>

									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>

			<div className="container mb-3 mt-1">
				<div className="text-center mt-5">
					<h2><b>How we <span style={{ color: '#047558' }}>Can help</span></b></h2>
					<p className="mt-2 mb-2">Making your job search easy</p><br />
				</div>
				<div className="row d-flex justify-content-evenly">
					<div className="col-sm-4 d-flex flex-column align-items-center" style={{ border: '1px solid white' }}>
						<div className='row'>
							<div className='col-sm-12 d-flex justify-content-center'>
								<img className='rounded-circle mt-3' alt='Recommendation System' style={{ height: '50px', width: '50px' }} src="https://imgs.search.brave.com/hpdfJZHPcHloUR5WAZNojVUKIBxromXHaey5r4vOKDA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk0LzIyLzEy/LzM2MF9GXzk0MjIx/MjUzX2ZBZ3YwSnlt/NTN5c3o3bndvcVhS/bWtiNkdBS3dOc2Zz/LmpwZw" />
							</div>
						</div>
						<p className='text-center'><b>Recommendation System</b></p>
						<p className='text-center'>Based on your user profile and applied internships we provide personalized recommendations to each user</p>
					</div>

					<div className="col-sm-4 d-flex flex-column align-items-center" style={{ border: '1px solid white' }}>
						<div className='row'>
							<div className='col-sm-12 d-flex justify-content-center'><img className='rounded-circle mt-3' alt='Diverse Fields' style={{ height: '50px', width: '50px' }} src="https://imgs.search.brave.com/33qxf-GFInjKB0BMxnS8H2nrWivpOtSXkq62w_4TZrI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzI5LzY0Lzg2/LzM2MF9GXzQyOTY0/ODYxOV9aZEQxbUxO/THhjNzlQMWw4NVpZ/eGpJQk9OenZ0MWF2/Ui5qcGc" /></div>
						</div>
						<p className='text-center'><b>Diverse Job Fields</b></p>
						<p className='text-center'>We provide a diverse field of options to search from to select your best suited internship</p>
					</div>

					<div className="col-sm-4 d-flex flex-column align-items-center" style={{ border: '1px solid white' }}>
						<div className='row '>
							<div className='col-sm-12 d-flex justify-content-center'><img className='rounded-circle mt-3' alt='Informed Decisions' style={{ height: '50px', width: '50px' }} src="https://imgs.search.brave.com/MiJWTHhcmmJAj0-_OXg8yFCrrMLUxLRDzj-kcjt-PMs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM4LmRlcG9zaXRw/aG90b3MuY29tLzEw/MDU5NzkvOTA1L2kv/NDUwL2RlcG9zaXRw/aG90b3NfOTA1Njgw/My1zdG9jay1waG90/by10aGUtaW5mby15/b3UtbmVlZC13ZWJz/aXRlLmpwZw" /></div>

						</div>

						<p className='text-center'><b>Informed Decision</b></p>
						<p className='text-center'>Look at the most in demand stats skills to make informed decisions</p>
					</div>
				</div>
			</div>

			<div className="container-fluid outer">
				<div className="text-center px-2 pt-5">
					<h2><b>What Our<span style={{ color: '#047558' }}> User says!!</span></b></h2>
					<p>Don't take our word for it , take theirs!</p>
				</div>

				<div className="container">
					<div className="row d-flex justify-content-evenly">
						{userFeedbackList.map((Feedback, index) => (
							<div key={index} className="col-sm-4 ml-2 mt-2 mb-5 ">
								<div className="card h-100 shadow" style={{ backgroundColor: '#E8E8E8' }}>
									<div className="card-body">
										<div className="row">
											<div className="col-lg-3  mt-1 mb-1"><img className="img rounded-circle" alt='Feedback' src="https://imgs.search.brave.com/Mc4msrfKAd8LPPSBTri5ibY_EbBsawd_LI30BkBDoIY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMTAvRGVm/YXVsdC1Qcm9maWxl/LVBpY3R1cmUtUE5H/LUhpZ2gtUXVhbGl0/eS1JbWFnZS5wbmc" style={{
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
										<h5 className="card-title mt-2" >"{Feedback.title}"</h5>

										<p className="card-text mt-3" style={{ fontWeight: "bold" }}>{Feedback.fdback}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="container-fluid outer">
				<div className="text-center px-2 pt-5">
					<h2><b>What The<span style={{ color: '#047558' }}> Companys says!!</span></b></h2>
					<p>Don't take our word for it , take theirs!</p>
				</div>

				<div className="container">
					<div className="row d-flex justify-content-evenly">
						{providerFeedbackList.map((Feedback, index) => (
							<div key={index} className="col-sm-4 ml-2 mt-2 mb-5 ">
								<div className="card h-100 shadow" style={{ backgroundColor: '#E8E8E8' }}>
									<div className="card-body">
										<div className="row">
											<div className="col-lg-3  mt-1 mb-1"><img className="img rounded-circle" alt='Feedback' src="https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png" style={{
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
										<h5 className="card-title mt-2" >"{Feedback.title}"</h5>

										<p className="card-text mt-3" style={{ fontWeight: "bold" }}>{Feedback.fdback}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}