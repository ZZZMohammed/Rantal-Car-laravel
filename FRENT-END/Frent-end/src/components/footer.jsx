

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logotafuglaa from "../assets/logotafuglaa.png";


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaFacebookF size={20} />, url: "https://www.facebook.com" },
    { icon: <FaInstagram size={20} />, url: "https://www.instagram.com" },
    { icon: <FaTwitter size={20} />, url: "https://www.twitter.com" },
    { icon: <FaLinkedinIn size={20} />, url: "https://www.linkedin.com" }
  ];

  const quickLinks = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About Us" },
    { path: "/findCar", text: "Find a car" },
    { path: "/contact", text: "Contact Us" }
  ];

  return (
    <footer className="bg-dark text-white py-3 ">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="text-center text-md-start">
              <img src={logotafuglaa} alt="Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
              <p className="text-muted mt-2">Find Your Dream Car</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-warning mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.path} className="text-white text-decoration-none hover-yellow">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <h5 className="text-warning mb-3">Contact Us</h5>
            <p className="mb-3">
              Email: <a href="mailto:support@carrental.com" className="text-white text-decoration-none hover-yellow">support@carrental.com</a>
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover-yellow"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="text-muted mb-0">
            &copy; {currentYear} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;