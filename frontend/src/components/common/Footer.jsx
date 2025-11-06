import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-section animate-fade-in">
      <div className="container pt-5 mt-5">
        <div className="row pb-4 gy-4 justify-content-between">

          <div className="col-lg-4 col-md-6 col-12 animate-slide-up">
            <h2 className="footer-logo">LMS</h2>
            <p className="footer-text">
              Join our Learning Management System and explore a wide range of courses
              to enhance your skills and achieve your goals.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-12 animate-slide-up">
            <h2 className="footer-heading">Popular Categories</h2>
            <ul className="footer-links">
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Machine Learning</a></li>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Logo Design</a></li>
              <li><a href="#">Graphic Design</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 animate-slide-up">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              <li><a href="#">Login</a></li>
              <li><a href="#">Register</a></li>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Courses</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom text-center py-3 mt-4 animate-fade-in">
          <p className="m-0">&copy; 2025 LMS — All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
