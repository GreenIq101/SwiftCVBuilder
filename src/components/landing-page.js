"use client"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import {
  ArrowRight,
  Sparkles,
  CloudDownload,
  Eye,
  Star,
  ShieldCheck,
  Wand2,
  Layers,
  CheckCircle,
  Zap,
  FileText,
  Palette,
  Target,
  Users,
  Award,
  ChevronDown,
  Play,
  BarChart3,
  Globe,
  Smartphone,
  Laptop,
  Monitor
} from "lucide-react"
import AuthScreen from "./auth-screen"

// Use images from src/Img folder
const templates = [
  { id: "classic", name: "Classic Glass", img: require("../Img/classic.png") },
  { id: "europass", name: "Europass", img: require("../Img/europass.png") },
  { id: "split", name: "Split Pro", img: require("../Img/split.png") },
  { id: "banner", name: "Photo Banner", img: require("../Img/banner.png") },
  { id: "dark", name: "Dark Block", img: require("../Img/dark.png") },
  { id: "gradient", name: "Modern Gradient", img: require("../Img/gradient.png") },
]

const LOGO_PATH = require("../Img/logo.png")

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const featuresRef = useRef(null)
  const templatesRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)

  if (showAuth) return <AuthScreen />

  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  const scrollToTemplates = () => templatesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Create professional CVs in under 5 minutes with our intelligent templates and smart suggestions.",
      stats: "5 min average"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Beautiful Designs",
      description: "Choose from 12+ professionally designed templates that make your CV stand out from the crowd.",
      stats: "12+ templates"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "ATS Optimized",
      description: "Our templates are designed to pass Applicant Tracking Systems used by major companies.",
      stats: "95% success rate"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Smart Analytics",
      description: "Get detailed scoring and optimization tips to improve your CV's effectiveness.",
      stats: "AI-powered"
    }
  ]

  return (
    <div className="modern-landing">
      {/* Navigation */}
      <nav className="modern-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img src={LOGO_PATH} alt="SwiftCV Logo" className="nav-logo" />
            <span className="nav-title">SwiftCV</span>
          </div>
          <div className="nav-links">
            <button onClick={scrollToFeatures} className="nav-link">Features</button>
            <button onClick={scrollToTemplates} className="nav-link">Templates</button>
            <Button
              onClick={() => setShowAuth(true)}
              className="nav-cta"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="h-4 w-4" />
              <span>New: AI-Powered CV Scoring</span>
            </div>

            <h1 className="hero-title">
              Build Your Dream Career with
              <span className="hero-accent"> Professional CVs</span>
            </h1>

            <p className="hero-subtitle">
              Create stunning, ATS-optimized resumes in minutes. Join 50,000+ professionals who've landed their dream jobs with SwiftCV.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">ATS Success</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12+</div>
                <div className="stat-label">Templates</div>
              </div>
            </div>

            <div className="hero-actions">
              <Button
                size="lg"
                onClick={() => setShowAuth(true)}
                className="hero-primary-btn"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToFeatures}
                className="hero-secondary-btn"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="hero-trust">
              <div className="trust-text">Trusted by professionals at</div>
              <div className="trust-logos">
                <div className="trust-logo">Google</div>
                <div className="trust-logo">Microsoft</div>
                <div className="trust-logo">Amazon</div>
                <div className="trust-logo">Meta</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-screen">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <div className="mockup-title">SwiftCV Builder</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-cv">
                    <div className="cv-header">
                      <div className="cv-photo"></div>
                      <div className="cv-info">
                        <div className="cv-name">John Smith</div>
                        <div className="cv-title">Senior Developer</div>
                      </div>
                    </div>
                    <div className="cv-body">
                      <div className="cv-section">
                        <div className="section-title">Experience</div>
                        <div className="section-content">
                          <div className="job-item">
                            <div className="job-company">Tech Corp</div>
                            <div className="job-role">Full Stack Developer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bg-elements">
          <div className="bg-element element-1"></div>
          <div className="bg-element element-2"></div>
          <div className="bg-element element-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section">
        <div className="features-container">
          <div className="features-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">Everything you need to succeed</h2>
            <p className="section-subtitle">
              Powerful tools and beautiful designs to make your CV stand out
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-stat">{feature.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section ref={templatesRef} className="templates-section">
        <div className="templates-container">
          <div className="templates-header">
            <div className="section-badge">Templates</div>
            <h2 className="section-title">Professional designs that impress</h2>
            <p className="section-subtitle">
              Choose from our collection of ATS-optimized templates
            </p>
          </div>

          <div className="templates-grid">
            {templates.map((template, index) => (
              <div key={template.id} className="template-card" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="template-image">
                  <img src={template.img} alt={template.name} />
                  <div className="template-overlay">
                    <Button
                      size="sm"
                      onClick={() => setShowAuth(true)}
                      className="template-cta"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
                <div className="template-info">
                  <h3 className="template-name">{template.name}</h3>
                  <p className="template-description">Professional design perfect for {template.name.toLowerCase()} style CVs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to build your perfect CV?</h2>
            <p className="cta-subtitle">
              Join thousands of professionals who've transformed their careers with SwiftCV
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>All templates included</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Unlimited exports</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Cloud storage</span>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => setShowAuth(true)}
              className="cta-button"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={LOGO_PATH} alt="SwiftCV Logo" className="footer-logo" />
            <span className="footer-title">SwiftCV</span>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#">Templates</a>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SwiftCV. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
