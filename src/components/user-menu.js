"use client"

import { LogOut, User } from "lucide-react"
import { signOutUser } from "../firebase"

export default function UserMenu({ user = null, onOpenManager = () => {} }) {
  if (!user) return null
  const name = user.displayName || user.email || "Account"

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border bg-light">
        {user.photoURL ? (
          <img
            src={user.photoURL || "/placeholder.svg?height=24&width=24&query=user%20avatar"}
            alt="Avatar"
            className="rounded-circle object-cover"
            style={{width: "24px", height: "24px"}}
          />
        ) : (
          <User style={{width: "16px", height: "16px"}} />
        )}
        <span className="small fw-medium">{name}</span>
      </div>
      <button className="btn btn-outline-primary" onClick={onOpenManager}>
        My CVs
      </button>
      <button className="btn btn-outline-secondary" onClick={signOutUser} title="Sign out">
        <LogOut style={{width: "16px", height: "16px"}} />
      </button>
    </div>
  )
}
