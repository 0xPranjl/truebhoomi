import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-3">
        <span className="navbar-brand fw-bold fs-4">🌍 TrueBhoomi</span>
      </nav>

      {/* Carousel */}
      <section className="container py-5">
        <div id="landCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow">
            <div className="carousel-item active">
              <video className="d-block w-100" autoPlay muted loop playsInline>
                <source src="landing1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#landCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#landCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero text-center py-5">
        <div className="container">
          <h1>
            Sell Land Smartly with <span style={{ color: '#0d6efd' }}>TrueBhoomi</span>
          </h1>
          <p className="text-muted">
            Get instant land price estimates based on real sales data near you.
          </p>
          <Link to="/estimate" className="btn btn-primary btn-cta mt-3">
            📍 Zameen Bechna Hai? Estimate Price
          </Link>
          <br></br>
          <Link to="/Agent" className="btn btn-primary btn-cta mt-3" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
  Agent bane
</Link>
        </div>
      </section>

      {/* Features */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="feature-icon mb-2" style={{ fontSize: '2rem', color: '#0d6efd' }}>📊</div>
            <h5>Real-Time Estimates</h5>
            <p>Location-based land prices using nearby sale data.</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-icon mb-2" style={{ fontSize: '2rem', color: '#0d6efd' }}>🤝</div>
            <h5>Connect with Agents</h5>
            <p>Verified real estate agents to help you sell fast.</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-icon mb-2" style={{ fontSize: '2rem', color: '#0d6efd' }}>🤑</div>
            <h5>Best Rate guaranteed!!</h5>
            <p>You get the best and true price for your land.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center bg-light py-4">
        <p>&copy; 2025 TrueBhoomi. Made in 🇮🇳 for every landowner.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
