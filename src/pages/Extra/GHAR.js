import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';

export const Home = () => {

	let navigate = useNavigate();

	useEffect(() => {
	  if(!localStorage.getItem('token')){
		navigate("/")
	  }
	}, [navigate])

	const containerStyles = {
		background: `url(${process.env.PUBLIC_URL}/images/mario-gogh-VBLHICVh-lI-unsplash.jpg)`,
		backgroundPosition: 'center',
		backgroundSize: '100%',
		backgroundRepeat: 'no-repeat',
		display: 'flex',
		flexWrap: 'wrap',
		color: '#fff',
		padding: '100px',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	  };
	  
  return (
	<div >
    <div className='mt-4' >
	<div className="img-container" style={{ width: "99vw", height: "33vw", overflow: "hidden", justifyContent: "center" }}>
    <img src={`${process.env.PUBLIC_URL}/images/bg.jpg`} alt="Background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</div>
<div className="d-flex justify-content-evenly flex-wrap flex-md-nowrap">
	<div className='m-3 ms-4 text-center'>
    <img className='ps-5 pe-5' src={process.env.PUBLIC_URL + '/images/icons8-resume-80.png'} alt="resume" />
    <h6 style={{ marginTop: '20px' }}>Search Millions of Internship</h6>
    <p style={{ color: 'grey' }}>We provide Millions of internships to the users/Students.</p>
  </div>
  <div className='m-3 text-center'>
    <img className='px-5' src={process.env.PUBLIC_URL + '/images/icons8-connection-80.png'} alt="resume" />
    <h6 style={{ marginTop: '20px' }}>Search Millions of Internship</h6>
    <p style={{ color: 'grey' }}>We provide Millions of internships to the users/Students.</p>
  </div>
  <div className='m-3 text-center'>
    <img className='px-5' src={process.env.PUBLIC_URL + '/images/icons8-career-64.png'} alt="resume" />
    <h6 style={{ marginTop: '20px' }}>Search Millions of Internship</h6>
    <p style={{ color: 'grey' }}>We provide Millions of internships to the users/Students.</p>
  </div>
  <div className='m-3 text-center'>
    <img className='px-5' src={process.env.PUBLIC_URL + '/images/icons8-candidate-68.png'} alt="resume" />
    <h6 style={{ marginTop: '20px' }}>Search Millions of Internship</h6>
    <p style={{ color: 'grey' }}>We provide Millions of internships to the users/Students.</p>
  </div>
	</div>

		<h1 className='mt-4 mb-5' style={{ color: '#228BE6', textAlign: 'center' }}> Our Reviews </h1>

		<div id="carouselExampleInterval" className="carousel slide mb-5" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
	<div className='d-flex float-left align-items-center justify-content-evenly'>
	<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person1.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person2.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person3.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
	</div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
	<div className='d-flex float-left align-items-center justify-content-evenly'>
	<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person4.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person5.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person6.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
	</div>
    </div>
    <div className="carousel-item">
	<div className='d-flex float-left align-items-center justify-content-evenly'>
	<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person7.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person8.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className="card" style={{width: '18rem'}}>
							<img src={process.env.PUBLIC_URL + '/images/person9.jpg'} className="card-img-top" style={{height: '325px'}}
								alt="person1"/>
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the
									card title and make up the bulk of the card's content.</p>
							</div>
						</div>
	</div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="container d-flex flex-wrap" style={{ ...containerStyles }}>
    <div className='mx-2'>
        <h6 className="fs-2 fw-bold">1,350,000</h6>
        <p className="fs-4 fw-normal text-center">Jobs</p>
    </div>
    <div className='mx-2'>
        <h6 className="fs-2 fw-bold">40,000</h6>
        <p className="fs-4 fw-normal text-center">Members</p>
    </div>
    <div className='mx-2'>
        <h6 className="fs-2 fw-bold">30,000</h6>
        <p className="fs-4 fw-normal text-center">Resume</p>
    </div>
    <div className='mx-2'>
        <h6 className="fs-2 fw-bold">10,500</h6>
        <p className="fs-4 fw-normal text-center ">Company</p>
    </div>
</div>

		<Footer/>
    </div>
	</div>
  )
}
