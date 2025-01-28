import React, { useState } from 'react';
import './landing.css';
import Register from './register/Register';
import Login from './register/Login';

const Landing = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="landing-header">
        <div className="logo">SimPay</div>
        <nav className="navbar">
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="btn btn-primary" onClick={toggleRegisterModal}>
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to SimPay</h1>
          <p className="hero-subtitle">
            Simplify your transactions with the most reliable and secure payment platform.
          </p>
          <button className="btn btn-primary" onClick={toggleRegisterModal}>
            Join Now
          </button>
          <button className="btn btn-secondary" onClick={toggleLoginModal}>
            Log In
          </button>
        </div>
        <div className="hero-image">
          <img src="hero-image.svg" alt="Hero" className="hero-img" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Why Choose SimPay?</h2>
        <div className="feature-list">
          <FeatureItem icon="fa-solid fa-shield" title="Secure" description="Your data and transactions are encrypted and secure." />
          <FeatureItem icon="fa-solid fa-arrow-clock" title="Fast" description="Experience lightning-fast transactions." />
          <FeatureItem icon="fa-solid fa-user" title="User-Friendly" description="Designed with simplicity in mind for all users." />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2 className="section-title">About Us</h2>
        <p className="about-text">
          SimPay is dedicated to making payments seamless, secure, and accessible to everyone.
          Whether you're an individual or a business, we've got you covered.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="section-title">Contact Us</h2>
          <p className="contact-text">Have questions? Reach out to us anytime.</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required className="form-control" />
            <input type="email" placeholder="Your Email" required className="form-control" />
            <textarea placeholder="Your Message" rows="4" required className="form-control"></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p className="copyright">&copy; {new Date().getFullYear()} SimPay. All rights reserved.</p>
      </footer>

      
      {/* Modals */}
      {showRegisterModal && (
        <div className="modal-overlay"> 
          <div className="modal-content">
            <button className="modal-close" onClick={toggleRegisterModal}>
              &times;
            </button>
            <Register /> 
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleLoginModal}>
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item">
    <i className={`fas ${icon} fa-3x`} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Landing;
