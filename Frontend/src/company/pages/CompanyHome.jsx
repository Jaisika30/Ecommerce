// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { loginUser } from '../../redux/slice/userSlice'

// const CompanyHome = () => {
//   const Navigate = useNavigate()
// const dispatch = useDispatch()
//   return (
//     <div>
//       <h1>Welcome to Company Home Page</h1>
//       <button onClick={()=>{localStorage.clear()
//       dispatch(loginUser(''))
//         Navigate("/login")
//       }}>Log out</button>
//     </div>
//   )
// }

// export default CompanyHome

import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./comDashboard.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slice/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import fashion from "../../../images/bg_fashion.jpg"
import fashionBackground from "../../../images/background_fashion.avif"
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { useCallback } from 'react';

const CompanyHome = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);
  const [loopCount, setLoopCount] = useState(0);
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Memoize token and userId to prevent unnecessary recalculations
  const token = localStorage.getItem("token");
  const userId = React.useMemo(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.data._id;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  }, [token]);
  const username = React.useMemo(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.data.name;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  }, [token]);
  const fullText = `Welcome to ${username} Fashion Mart`;

  // Memoize the getProducts function
  const getProducts = useCallback(async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/product/getallByUserId?userId=${userId}`);
      return resp.data.data;
    } catch (error) {
      console.error("Error fetching products", error);
      return [];
    }
  }, [userId]);

  // Configure query to prevent unnecessary refetches
  const { data } = useQuery({
    queryKey: ["products", userId],
    queryFn: getProducts,
    enabled: !!userId, // Only fetch if userId exists
    staleTime: 5 * 60 * 1000, // 5 minutes before data becomes stale
  });

  // Typing effect - optimized with useCallback
  useEffect(() => {
    let timer;

    const handleTyping = () => {
      if (!isDeleting && displayedText.length === fullText.length) {
        setSpeed(1000);
        setIsDeleting(true);
      } else if (isDeleting && displayedText === "") {
        setSpeed(500);
        setIsDeleting(false);
        setLoopCount(prev => prev + 1);
      } else {
        setSpeed(150);
        setDisplayedText(isDeleting
          ? prev => prev.slice(0, -1)
          : prev => fullText.slice(0, prev.length + 1)
        );
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, fullText, speed]);

  // Hero text animation - empty dependency array means it runs once on mount
  useEffect(() => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    dispatch(loginUser(''));
    navigate("/login");
  }, [dispatch, navigate]);

  // Memoize the product cards to prevent unnecessary re-renders
  const productCards = React.useMemo(() => {
    return data?.map((item) => (
      <div className="col-md-12 col-lg-3 mb-4 mb-lg-0" key={item._id}>
        {/* Your product card JSX */}
      </div>
    ));
  }, [data]);

  return (
    <div className="company-home ">
      {/* Navbar */}

      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgb(245 226 50)' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">

          {/* Logo + Brand */}
          <a className="navbar-brand d-flex align-items-center text-dark" href="#">
            <img
              src="/images/logo.jpg"
              alt="Jass Fashion Mart"
              width="50"
              height="50"
              className="d-inline-block align-top me-2 rounded-circle"
            />
            Jass Fashion Mart
          </a>

          {/* Toggle Button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center gap-3">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/company/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-dark text-light px-3 py-1" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      {/* Hero Section with Overlay */}
      <section className="hero-section position-relative">
        <div className="hero-image" style={{
          backgroundImage: `url(${(fashionBackground)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh'
        }}>
          <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
          <div className="container position-relative h-100 d-flex align-items-center">
            <div className="hero-text text-white text-center w-100" style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 1s ease, transform 1s ease'
            }}>
              <h1 className="display-3 fw-bold mb-4" style={{ color: "rgb(245 226 50)" }}>
                {displayedText}
                {/* <span className="blinking-cursor">|</span> */}
                <style jsx>{`
       
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
              </h1>
              <p className="lead mb-5">Your premier destination for the latest fashion trends</p>
              <div className="d-flex justify-content-center">
                <button className="btn-hero btn darkyellow p-0 me-2">Learn More</button>
                <button className="btn-hero btn btn-outline-light p-0">Our Services</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light service-background">
        <div className="container py-5 ">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4" style={{ color: "rgb(245 226 50)" }}>{`About ${username} Fashion Mart`}</h2>
              <p className="lead mb-4 text-light">
                {`At  ${username} Fashion Mart, we believe that fashion is more than just clothing - it's a way to express yourself.
                Since our founding in 2010, we've been committed to bringing the latest trends to fashion-forward individuals.`}
              </p>
              <p className='text-light'>
                Our curated collection features high-quality materials, unique designs, and styles that stand the test of time.
                Whether you're looking for casual wear, formal attire, or something in between, we have something for every occasion.
              </p>
            </div>
            <div className="col-lg-4">
              <img
                src={fashion}
                alt="About Jass Fashion Mart"
                className="img-fluid rounded shadow"
                style={{
                  width: "300px",
                  marginLeft: "50px",
                  border: "none !important",
                  boxShadow: "none !important",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products card section*/}
      <section className='service-background'>
        <div className="container py-5">

          <div className="row mt-3">
            {data &&
              data?.map((item) => (
                // Card
                <div className="col-md-12 col-lg-3 mb-4 mb-lg-0">
                  <div className="card">
                    <div className="d-flex justify-content-between p-3">
                      <p className="lead mb-0 fw-bold">{item.name}</p>
                      {/* <div
                    className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: "35px", height: "35px" }}
                  >
                    
                  </div> */}

                    </div>
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                        marginLeft: "30px",
                      }}
                      src={`${BASE_URL}/${item.productImg}`}
                      className="card-img-top"
                      alt="Laptop"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        {/* <p className="small">
                      <a href="#!" className="text-muted">
                      Category:{item.category}
                      </a>
                    </p> */}

                        <div className="mb-2">
                          <strong>Category:</strong> {item.category}
                        </div>
                        <p className="small text-danger">
                          <s>{item.discount}%</s>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <div className="mb-2">
                          <strong>Stock:</strong> {item.stock}
                        </div>
                        <div className="mb-2">
                          <strong>Price:</strong> ${item.basePrice}
                        </div>
                      </div>

                      <div className="  mb-2">
                        <div className="mb-3">
                          <strong>Description:</strong>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{item.description}</Tooltip>}
                          >
                            <p
                              style={{
                                fontSize: '14px',
                                marginTop: '5px',
                                cursor: 'pointer',
                                display: '-webkit-box',
                                WebkitLineClamp: 3, // Optional: Limit to 3 lines
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {item.description.length > 30
                                ? `${item.description.substring(0, 30)}...`
                                : item.description}
                            </p>
                          </OverlayTrigger>
                        </div>
                        {/* <div className="ms-auto text-warning">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div> */}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="container-fluid">
            {/* Logo & other elements */}
            <div className="d-flex justify-content-center mt-3 align-items-center">
              <button
                className="btn me-3 fw-bold"
                style={{ backgroundColor: 'rgb(245 226 50)', color: '#000', width: "150px" }}
                onClick={() => navigate("/company/addProduct")} // Add your click handler
              >
                <i className="bi bi-plus-circle me-2"></i> Add Product
              </button>
              {/* Other buttons (e.g., Logout) */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-2 service-background">
        <div className="container py-5 ">
          <h2 className="text-center text-light display-5 fw-bold mb-5">What We Offer</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm shadow-sm hover-scale">
                <div className="card-body text-center p-4">
                  <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4" style={{ width: '70px', height: '70px', lineHeight: '70px' }}>
                    {/* Ensure the icon name and CSS are correct */}
                    <i className="bi bi-shop-window fs-3  text-dark"></i>
                  </div>
                  <h4 className="mb-3">Add Products</h4>
                  <p className="text-muted">
                    Easily add your fashion items to our platform with detailed descriptions and images.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0  hover-scale">
                <div className="card-body text-center p-4">
                  <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-4" style={{ width: '70px', height: '70px', lineHeight: '70px' }}>
                    <i className="bi bi-people fs-3  text-dark"></i>
                  </div>
                  <h4 className="mb-3">Customer Insights</h4>
                  <p className="text-muted">
                    View detailed analytics about your customers and their purchasing behavior.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-scale">
                <div className="card-body text-center p-4">
                  <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle mx-auto mb-4" style={{ width: '70px', height: '70px', lineHeight: '70px' }}>
                    <i className="bi bi-graph-up fs-3  text-dark"></i>
                  </div>
                  <h4 className="mb-3">Sales Analytics</h4>
                  <p className="text-muted">
                    Track your sales performance with comprehensive reports and analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4">Jass Fashion Mart</h5>
              <p>
                Bringing you the latest fashion trends with quality and style since 2010.
              </p>
              <div className="mt-4">
                <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#about" className="text-white text-decoration-none">About Us</a></li>
                <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Services</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="text-uppercase mb-4">Contact Us</h5>
              <address>
                <p><i className="bi bi-geo-alt me-2 "></i> 123 Fashion Street, New York, NY</p>
                <p><i className="bi bi-envelope me-2"></i> info@jassfashion.com</p>
                <p><i className="bi bi-phone me-2"></i> +1 (234) 567-8900</p>
              </address>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Jass Fashion Mart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyHome;