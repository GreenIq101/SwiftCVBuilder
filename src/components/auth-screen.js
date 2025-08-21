"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { ChromeIcon as Google, LogIn, UserPlus, Sparkles } from "lucide-react"
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

  return (
    <div className="auth-page site-magenta-bg">
      <div className="auth-frame notch-card elevated">
        <div className="auth-header magenta-gradient">
          <img src={LOGO_PATH} alt="SwiftCV" className="auth-logo" />
          <h2 className="auth-title">Welcome to SwiftCV</h2>
          <p className="auth-sub">Sign in to save, export and manage your resumes.</p>
        </div>

        <div className="auth-body">
          <Tabs defaultValue="signin">
            <TabsList className="auth-tabs">
              <TabsTrigger value="signin" className="tab-trigger">Sign in</TabsTrigger>
              <TabsTrigger value="signup" className="tab-trigger">Sign up</TabsTrigger>
            </TabsList>

            <Separator className="my-4" />

            <TabsContent value="signin">
              <div className="space-y-4">
                <label className="label">Email</label>
                <Input value={emailIn} onChange={(e) => setEmailIn(e.target.value)} className="input" />
                <label className="label">Password</label>
                <Input type="password" value={passIn} onChange={(e) => setPassIn(e.target.value)} className="input" />
                <Button
                  className="btn-pill primary-btn w-full"
                  disabled={busy}
                  onClick={() => withBusy(() => signInWithEmail(emailIn, passIn))}
                >
                  <LogIn className="h-4 w-4 mr-2" /> Continue
                </Button>

                <div className="divider-note">or</div>

                <Button
                  variant="outline"
                  className="btn-pill ghost-btn w-full"
                  disabled={busy}
                  onClick={() => withBusy(signInWithGooglePopup)}
                >
                  <Google className="h-4 w-4 mr-2" /> Continue with Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-4">
                <label className="label">Display name</label>
                <Input value={nameUp} onChange={(e) => setNameUp(e.target.value)} className="input" />
                <label className="label">Email</label>
                <Input type="email" value={emailUp} onChange={(e) => setEmailUp(e.target.value)} className="input" />
                <label className="label">Password</label>
                <Input type="password" value={passUp} onChange={(e) => setPassUp(e.target.value)} className="input" />

                <Button
                  className="btn-pill primary-btn w-full"
                  disabled={busy}
                  onClick={() => withBusy(() => signUpWithEmail(emailUp, passUp, nameUp))}
                >
                  <UserPlus className="h-4 w-4 mr-2" /> Create account
                </Button>

                <div className="divider-note">or</div>

                <Button
                  variant="outline"
                  className="btn-pill ghost-btn w-full"
                  disabled={busy}
                  onClick={() => withBusy(signInWithGooglePopup)}
                >
                  <Google className="h-4 w-4 mr-2" /> Continue with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {error ? <div className="auth-error">{error}</div> : null}
        </div>
      </div>
    </div>
  )
}
