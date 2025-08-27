"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { ChromeIcon as Google, LogIn, UserPlus, Sparkles, ArrowRight, CheckCircle, FileText, Users, Award } from "lucide-react"
import { signInWithGooglePopup, signInWithEmail, signUpWithEmail } from "../firebase"

// Use logo from src/Img folder directly
const LOGO_PATH = require("../Img/logo.png")

export default function AuthScreen() {
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
    { icon: <FileText className="h-5 w-5" />, text: "12+ Professional Templates" },
    { icon: <Users className="h-5 w-5" />, text: "50K+ Happy Users" },
    { icon: <Award className="h-5 w-5" />, text: "95% ATS Success Rate" }
  ]

  return (
    <div className="modern-auth">
      {/* Background Elements */}
      <div className="auth-bg-elements">
        <div className="bg-element element-1"></div>
        <div className="bg-element element-2"></div>
        <div className="bg-element element-3"></div>
      </div>

      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="brand-header">
              <img src={LOGO_PATH} alt="SwiftCV Logo" className="brand-logo" />
              <h1 className="brand-title">SwiftCV</h1>
              <p className="brand-subtitle">Professional Resume Builder</p>
            </div>

            <div className="brand-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="brand-quote">
              <blockquote>
                "SwiftCV helped me land my dream job in just 2 weeks!"
              </blockquote>
              <cite>- Sarah Johnson, Senior Developer</cite>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form-container">
          <div className="auth-form-card">
            <div className="auth-form-header">
              <h2 className="auth-form-title">
                {activeTab === "signin" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="auth-form-subtitle">
                {activeTab === "signin"
                  ? "Sign in to continue building amazing resumes"
                  : "Join thousands of professionals who've transformed their careers"
                }
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="auth-tabs">
              <TabsList className="auth-tab-list">
                <TabsTrigger value="signin" className="auth-tab">Sign in</TabsTrigger>
                <TabsTrigger value="signup" className="auth-tab">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="auth-tab-content">
                <form className="auth-form" onSubmit={(e) => {
                  e.preventDefault()
                  withBusy(() => signInWithEmail(emailIn, passIn))
                }}>
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <Input
                      type="email"
                      value={emailIn}
                      onChange={(e) => setEmailIn(e.target.value)}
                      placeholder="Enter your email"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <Input
                      type="password"
                      value={passIn}
                      onChange={(e) => setPassIn(e.target.value)}
                      placeholder="Enter your password"
                      className="form-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={busy}
                  >
                    {busy ? "Signing in..." : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="auth-divider">
                  <span className="divider-text">or continue with</span>
                </div>

                <Button
                  variant="outline"
                  className="auth-google-btn"
                  disabled={busy}
                  onClick={() => withBusy(signInWithGooglePopup)}
                >
                  <Google className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="auth-tab-content">
                <form className="auth-form" onSubmit={(e) => {
                  e.preventDefault()
                  withBusy(() => signUpWithEmail(emailUp, passUp, nameUp))
                }}>
                  <div className="form-group">
                    <label className="form-label">Full name</label>
                    <Input
                      type="text"
                      value={nameUp}
                      onChange={(e) => setNameUp(e.target.value)}
                      placeholder="Enter your full name"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <Input
                      type="email"
                      value={emailUp}
                      onChange={(e) => setEmailUp(e.target.value)}
                      placeholder="Enter your email"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <Input
                      type="password"
                      value={passUp}
                      onChange={(e) => setPassUp(e.target.value)}
                      placeholder="Create a password"
                      className="form-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={busy}
                  >
                    {busy ? "Creating account..." : "Create account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="auth-divider">
                  <span className="divider-text">or continue with</span>
                </div>

                <Button
                  variant="outline"
                  className="auth-google-btn"
                  disabled={busy}
                  onClick={() => withBusy(signInWithGooglePopup)}
                >
                  <Google className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="auth-error">
                <div className="error-icon">⚠️</div>
                <span className="error-message">{error}</span>
              </div>
            )}

            <div className="auth-footer">
              <p className="auth-footer-text">
                By continuing, you agree to our{" "}
                <a href="#" className="auth-link">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="auth-link">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
