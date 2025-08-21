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
  if (showAuth) return <AuthScreen />

  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="page-shell site-magenta-bg">
      {/* Hero - simplified, large centered card like reference */}
      <section className="hero-wrap">
        <div className="hero-card notch-card">
          <div className="hero-top magenta-gradient">
            <img src={LOGO_PATH} alt="SwiftCV" className="hero-logo" />
            <div className="hero-actions">
              <Button className="btn-pill primary-btn" onClick={() => setShowAuth(true)}>
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="hero-body">
            <h1 className="hero-title">
              SwiftCV Builder
            </h1>
            <p className="hero-lead">
              Build a polished, modern CV in minutes — smart templates, live preview, and instant PDF export.
            </p>

            <div className="hero-cta-row">
              <Button className="btn-pill ghost-btn" onClick={scrollToFeatures}>
                Explore Templates
              </Button>
              <Button className="btn-pill accent-btn" onClick={() => setShowAuth(true)}>
                Create CV — It's Free
              </Button>
            </div>

            <div className="hero-meta">
              <div className="meta-item"><Star className="h-4 w-4" /> Loved by job-seekers</div>
              <div className="meta-item"><ShieldCheck className="h-4 w-4" /> Privacy-first</div>
              <div className="meta-item"><CloudDownload className="h-4 w-4" /> One-click PDF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" ref={featuresRef} className="container features-grid">
        <div className="feature-card pop-in">
          <Sparkles className="f-icon" />
          <h3>Speedy templates</h3>
          <p>Intelligent defaults, beautiful layouts — get a pro CV in minutes.</p>
        </div>
        <div className="feature-card pop-in">
          <Eye className="f-icon" />
          <h3>Live preview</h3>
          <p>See edits in real-time and switch templates without losing data.</p>
        </div>
        <div className="feature-card pop-in">
          <Layers className="f-icon" />
          <h3>Flexible sections</h3>
          <p>Add, hide, and reorder sections easily to tailor your CV.</p>
        </div>
      </section>

      {/* Template gallery — pill gallery with notch cards */}
      <section id="templates" className="container templates-section">
        <div className="section-header">
          <h2>Templates that impress</h2>
          <div className="section-note"><Wand2 className="h-4 w-4 mr-2" />All templates free for limited time</div>
        </div>

        <div className="gallery-strip">
          {templates.map((t, i) => (
            <article key={t.id} className="gallery-card notch-card" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="gallery-img">
                <img src={t.img} alt={`${t.name} preview`} />
              </div>
              <div className="gallery-footer">
                <span className="gallery-name">{t.name}</span>
                <Button className="btn-small ghost-btn">Preview</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container site-footer">
        © {new Date().getFullYear()} SwiftCV Builder
      </footer>
    </div>
  )
}
