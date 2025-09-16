"use client"

import { useState, useRef } from "react"
import AuthScreen from "./auth-screen"

// Use images from src/Img folder
const templates = [
  { id: "classic", name: "Classic Glass", img: require("../Img/classic.png"), description: "Clean and professional" },
  { id: "europass", name: "Europass", img: require("../Img/europass.png"), description: "European standard" },
  { id: "split", name: "Split Pro", img: require("../Img/split.png"), description: "Modern two-column" },
  { id: "banner", name: "Photo Banner", img: require("../Img/banner.png"), description: "Eye-catching header" },
  { id: "dark", name: "Dark Block", img: require("../Img/dark.png"), description: "Sleek dark theme" },
  { id: "gradient", name: "Modern Gradient", img: require("../Img/gradient.png"), description: "Colorful gradients" },
]

const LOGO_PATH = require("../Img/logo.png")

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const featuresRef = useRef(null)

  if (showAuth) return <AuthScreen />

  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-modern fixed-top">
        <div className="container">
          <a className="navbar-brand navbar-brand-modern d-flex align-items-center" href="#">
            <img src={LOGO_PATH} alt="SwiftCV Logo" className="me-2" style={{height: "40px", width: "40px"}} />
            SwiftCV Builder
          </a>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features" onClick={scrollToFeatures}>Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#templates">Templates</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-gradient btn-sm ms-3" onClick={() => setShowAuth(true)}>
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-modern position-relative d-flex align-items-center">
        <div className="container position-relative z-1">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 animate-fade-in-up">
              <div className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill mb-4 d-inline-block">
                <i className="bi bi-stars me-1"></i>
                Freemium: All templates unlocked!
              </div>

              <h1 className="hero-title display-3 fw-bold text-white mb-4">
                Build Your CV <span className="gradient-text">Faster</span> & <span className="gradient-text">Better</span>
              </h1>

              <p className="hero-subtitle lead text-white mb-5">
                SwiftCV Builder helps you create a modern, professional resume in minutes.
                Choose from beautiful templates, preview live, and export instantly.
                <span className="fw-bold text-warning"> No signup required for basic use!</span>
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <button className="btn btn-gradient btn-lg px-4 py-3" onClick={() => setShowAuth(true)}>
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Start Building Free
                </button>
                <button className="btn btn-glass btn-lg px-4 py-3" onClick={scrollToFeatures}>
                  <i className="bi bi-eye me-2"></i>
                  Explore Templates
                </button>
              </div>

              <div className="row g-4 text-white">
                <div className="col-sm-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-2 fs-5"></i>
                    <span>10,000+ Users</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-shield-check text-success me-2 fs-5"></i>
                    <span>Privacy First</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cloud-download text-info me-2 fs-5"></i>
                    <span>One-Click PDF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 animate-fade-in">
              <div className="text-center">
                <div className="glass-card p-5 rounded-4 shadow-glow">
                  <div className="mb-4">
                    <i className="bi bi-file-earmark-text display-1 text-primary"></i>
                  </div>
                  <h3 className="h4 mb-3">Live Preview</h3>
                  <p className="text-muted mb-4">See your changes instantly as you build</p>
                  <div className="bg-light bg-opacity-10 p-3 rounded-3">
                    <div className="text-start">
                      <h5 className="mb-2">John Doe</h5>
                      <p className="small text-muted mb-2">Frontend Developer</p>
                      <p className="small mb-0">Experienced developer with 5+ years in React, Node.js, and modern web technologies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-pattern"></div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Why Choose SwiftCV?</h2>
              <p className="lead text-muted">Everything you need to create a standout resume</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4 animate-slide-in-left">
              <div className="card card-modern h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-lightning-charge display-4 text-primary"></i>
                  </div>
                  <h5 className="card-title fw-bold">Lightning Fast</h5>
                  <p className="card-text text-muted">Create professional resumes in minutes with our intelligent templates and smart defaults.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 animate-fade-in-up">
              <div className="card card-modern h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-eye display-4 text-success"></i>
                  </div>
                  <h5 className="card-title fw-bold">Live Preview</h5>
                  <p className="card-text text-muted">See your changes instantly with our real-time preview system. No more guesswork.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 animate-slide-in-right">
              <div className="card card-modern h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-palette display-4 text-warning"></i>
                  </div>
                  <h5 className="card-title fw-bold">Beautiful Templates</h5>
                  <p className="card-text text-muted">Choose from professionally designed templates that make your resume stand out.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Professional Templates</h2>
              <p className="lead text-muted">Choose from our collection of ATS-optimized templates</p>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                <i className="bi bi-gift me-1"></i>
                Freemium: All templates free for a limited time
              </div>
            </div>
          </div>

          <div className="row g-4">
            {templates.map((template, index) => (
              <div key={template.id} className="col-lg-4 col-md-6 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card card-modern h-100 border-0 shadow-sm overflow-hidden">
                  <div className="position-relative">
                    <img
                      src={template.img}
                      alt={`${template.name} template`}
                      className="card-img-top"
                      style={{height: "200px", objectFit: "cover"}}
                    />
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <button className="btn btn-primary btn-lg rounded-pill px-4">
                        <i className="bi bi-eye me-2"></i>
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{template.name}</h5>
                    <p className="card-text text-muted small">{template.description}</p>
                    <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => setShowAuth(true)}>
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3">Ready to Build Your Perfect CV?</h2>
              <p className="lead mb-4 opacity-75">
                Join thousands of professionals who have already created stunning resumes with SwiftCV Builder.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button className="btn btn-light btn-lg px-4 py-3" onClick={() => setShowAuth(true)}>
                  <i className="bi bi-play-circle me-2"></i>
                  Start Building Now
                </button>
                <div className="text-white-50">
                  <small>✓ No credit card required<br />✓ All templates included<br />✓ Export to PDF instantly</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <div className="glass-card p-4 rounded-4">
                <i className="bi bi-trophy display-3 text-warning mb-3"></i>
                <h4 className="fw-bold mb-2">Free Forever</h4>
                <p className="small opacity-75">Limited time offer - claim your premium features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center mb-3">
                <img src={LOGO_PATH} alt="SwiftCV Logo" className="me-2" style={{height: "32px", width: "32px"}} />
                <span className="fw-bold fs-5">SwiftCV Builder</span>
              </div>
              <p className="text-white mb-3">
                Create professional resumes with ease. Beautiful templates, live preview, and instant PDF export.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-github"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3">
              <h6 className="fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Templates</a></li>
                <li><a href="#" className="text-white text-decoration-none">Features</a></li>
                <li><a href="#" className="text-white text-decoration-none">Pricing</a></li>
                <li><a href="#" className="text-white text-decoration-none">API</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Help Center</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
              </ul>
            </div>

            <div className="col-lg-4">
              <h6 className="fw-bold mb-3">Stay Updated</h6>
              <p className="text-white small mb-3">
                Get the latest updates on new templates and features.
              </p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>

          <hr className="my-4 opacity-25" />

          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-white small mb-0">
                © {new Date().getFullYear()} SwiftCV Builder. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-white small mb-0">
                Made with <i className="bi bi-heart-fill text-danger mx-1"></i> for your career success
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
