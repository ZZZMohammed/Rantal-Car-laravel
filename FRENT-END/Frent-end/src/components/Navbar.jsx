import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logotafuglaa from "../assets/logotafuglaa.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS for dropdown functionality

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Accept-Language': i18n.language, // Send current language to backend
          },
        });
        if (response.ok) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  // Language switcher handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold fs-3 text-light logo-text"
            to="/"
          >
            <img src={logotafuglaa} alt="Tif-Cars Logo" className="logo-img" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>{t('navbar.home')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/About'}>{t('navbar.about')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/FindCar'}>{t('navbar.find_car')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/Contact'}>{t('navbar.contact')}</Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            {/* Language Switcher */}
            <div className="dropdown ms-2">
              <button
                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {i18n.language.toUpperCase()}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
                  >
                    EN
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`dropdown-item ${i18n.language === 'fr' ? 'active' : ''}`}
                  >
                    FR
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`dropdown-item ${i18n.language === 'ar' ? 'active' : ''}`}
                  >
                    AR
                  </button>
                </li>
              </ul>
            </div>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <Link className='btn ms-2 p-2 authButton' to={'/Login'}>{t('navbar.login')}</Link>
            ) : (
              <button className='btn btn-danger ms-2 p-2' onClick={handleLogout}>
                {t('navbar.logout')}
              </button>
            )}
            <Link className="btn btn-warning ms-2 p-2 authButton" to={'/Book'}>
              {t('navbar.book_now')}
            </Link>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .custom-navbar {
          background-color: rgb(0, 0, 0);
        }
        .logo-text {
          padding: 0;
          margin: 0;
        }
        .logo-img {
          width: 90px;
          height: auto;
        }
        .navbar-toggler-icon {
          background-color: transparent;
          border: none; /* No border for hamburger icon */
        }
        .navbar-nav .nav-link {
          color: #f8f9fa !important;
          font-weight: 500;
        }
        .navbar-nav .nav-link:hover {
          color: #ffc107 !important;
        }
        .custom-toggler {
          border-color: transparent; /* Remove border for the button */
        }
        .custom-link {
          font-size: 16px;
        }
        .custom-navbar .navbar-nav .nav-item {
          margin-left: 20px;
        }

        /* Add custom show class for menu when opened */
        .navbar-collapse.show {
          display: block !important;
        }

        .authButton {
          outline: none;
          font-family: Arial, Helvetica, sans-serif;
          text-decoration: none;
          color: white;
          font-size: 20px;
          font-style: italic;
          padding: 8px 15px;
          border-radius: 10px;
          border: none;
          transition: background 0.3s, color 0.3s;
        }
        
        .authButton:hover {
          background-color: #ffcc00;
          color: black;
        }
      `}</style>
    </>
  );
}
