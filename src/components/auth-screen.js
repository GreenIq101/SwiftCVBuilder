"use client"

import { useState } from "react"
import { signInWithGooglePopup, signInWithEmail, signUpWithEmail } from "../firebase"

// Use logo from src/Img folder directly
const LOGO_PATH = require("../Img/logo.png")

export default function AuthScreen({ onBack }) {
  const [emailIn, setEmailIn] = useState("")
  const [passIn, setPassIn] = useState("")
  const [emailUp, setEmailUp] = useState("")
  const [passUp, setPassUp] = useState("")
  const [nameUp, setNameUp] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("signin")

  const withBusy = async (fn) => {
    setBusy(true)
    setError("")
    try {
      await fn()
    } catch (e) {
      setError(e?.message || "Auth error")
    } finally {
      setBusy(false)
    }
  }

  const features = [
    { icon: "bi-file-earmark-text", text: "12+ Professional Templates" },
    { icon: "bi-people", text: "50K+ Happy Users" },
    { icon: "bi-trophy", text: "95% ATS Success Rate" }
  ]

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pattern">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card glass-card border-0 shadow-glow overflow-hidden">
              <div className="row g-0">
                {/* Left Side - Branding */}
                <div className="col-lg-6 d-none d-lg-block">
                  <div className="auth-branding p-5 h-100 d-flex flex-column justify-content-center">
                    <div className="text-center mb-5">
                      <img src={LOGO_PATH} alt="SwiftCV Logo" className="mb-3" style={{height: "80px", width: "80px"}} />
                      <h2 className="display-6 fw-bold gradient-text mb-2">SwiftCV Builder</h2>
                      <p className="text-light">Professional Resume Builder</p>
                    </div>

                    <div className="mb-5">
                      {features.map((feature, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                            <i className={`bi ${feature.icon} text-primary fs-5`}></i>
                          </div>
                          <span className="fw-medium text-light">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-light bg-opacity-10 p-4 rounded-4">
                      <blockquote className="blockquote mb-3">
                        <p className="fst-italic text-light">"SwiftCV helped me land my dream job in just 2 weeks!"</p>
                      </blockquote>
                      <footer className="blockquote-footer text-light">
                        Sarah Johnson, Senior Developer
                      </footer>
                    </div>
                  </div>
                </div>

                {/* Right Side - Auth Form */}
                <div className="col-lg-6">
                  <div className="p-5 text-dark">
                    {/* Back Button - Top of Form */}
                    {onBack && (
                      <div className="mb-4 d-flex justify-content-start">
                        <button
                          type="button"
                          className="btn btn-danger btn-lg d-flex align-items-center shadow-sm"
                          onClick={onBack}
                          style={{
                            borderRadius: '25px',
                            padding: '12px 24px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            border: '2px solid #dc3545',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="bi bi-arrow-left me-2 fs-5"></i>
                          <span>Back to Landing Page</span>
                        </button>
                      </div>
                    )}

                    {/* Tab Navigation */}
                    <ul className="nav nav-pills nav-fill mb-4" id="authTabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'signin' ? 'active' : ''} fw-bold`}
                          onClick={() => setActiveTab('signin')}
                          type="button"
                          role="tab"
                        >
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'signup' ? 'active' : ''} fw-bold`}
                          onClick={() => setActiveTab('signup')}
                          type="button"
                          role="tab"
                        >
                          <i className="bi bi-person-plus me-2"></i>
                          Sign Up
                        </button>
                      </li>
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content">
                      {/* Sign In Tab */}
                      {activeTab === 'signin' && (
                        <div className="tab-pane fade show active">
                          <div className="text-center mb-4">
                            <h3 className="fw-bold mb-2 font-color text-light " > Welcome Back!</h3>
                            <p className="text-muted">Sign in to continue building amazing resumes</p>
                          </div>

                          <form onSubmit={(e) => {
                            e.preventDefault()
                            withBusy(() => signInWithEmail(emailIn, passIn))
                          }}>
                            <div className="mb-3">
                              <label htmlFor="signinEmail" className="form-label fw-semibold text-light">Email Address</label>
                              <input
                                type="email"
                                className="form-control form-control-modern"
                                id="signinEmail"
                                value={emailIn}
                                onChange={(e) => setEmailIn(e.target.value)}
                                placeholder="Enter your email"
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="signinPassword" className="form-label fw-semibold text-light">Password</label>
                              <input
                                type="password"
                                className="form-control form-control-modern"
                                id="signinPassword"
                                value={passIn}
                                onChange={(e) => setPassIn(e.target.value)}
                                placeholder="Enter your password"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-gradient w-100 mb-3"
                              disabled={busy}
                            >
                              {busy ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                  Signing in...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-arrow-right me-2"></i>
                                  Continue
                                </>
                              )}
                            </button>
                          </form>

                          <div className="text-center mb-3">
                            <span className="text-light">or continue with</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-primary w-100 mb-4"
                            disabled={busy}
                            onClick={() => withBusy(signInWithGooglePopup)}
                          >
                            <i className="bi bi-google me-2"></i>
                            Continue with Google
                          </button>
                        </div>
                      )}

                      {/* Sign Up Tab */}
                      {activeTab === 'signup' && (
                        <div className="tab-pane fade show active">
                          <div className="text-center mb-4">
                            <h3 className="fw-bold mb-2 text-light ">Create Your Account</h3>
                            <p className="text-light">Join thousands of professionals who've transformed their careers</p>
                          </div>

                          <form onSubmit={(e) => {
                            e.preventDefault()
                            withBusy(() => signUpWithEmail(emailUp, passUp, nameUp))
                          }}>
                            <div className="mb-3">
                              <label htmlFor="signupName" className="form-label fw-semibold text-light">Full Name</label>
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                id="signupName"
                                value={nameUp}
                                onChange={(e) => setNameUp(e.target.value)}
                                placeholder="Enter your full name"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="signupEmail" className="form-label fw-semibold text-light">Email Address</label>
                              <input
                                type="email"
                                className="form-control form-control-modern"
                                id="signupEmail"
                                value={emailUp}
                                onChange={(e) => setEmailUp(e.target.value)}
                                placeholder="Enter your email"
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="signupPassword" className="form-label fw-semibold text-light">Password</label>
                              <input
                                type="password"
                                className="form-control form-control-modern"
                                id="signupPassword"
                                value={passUp}
                                onChange={(e) => setPassUp(e.target.value)}
                                placeholder="Create a password"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-gradient w-100 mb-3"
                              disabled={busy}
                            >
                              {busy ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                  Creating account...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-person-plus me-2"></i>
                                  Create Account
                                </>
                              )}
                            </button>
                          </form>

                          <div className="text-center mb-3">
                            <span className="text-light">or continue with</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-primary w-100 mb-4"
                            disabled={busy}
                            onClick={() => withBusy(signInWithGooglePopup)}
                          >
                            <i className="bi bi-google me-2"></i>
                            Continue with Google
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <div>{error}</div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="text-center mt-4">
                      <small className="text-light">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-decoration-none">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-decoration-none">Privacy Policy</a>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
