"use client"

import { Button } from "./ui/button"
import { LogOut, User } from "lucide-react"
import { signOutUser } from "../firebase"

export default function UserMenu({ user = null, onOpenManager = () => {} }) {
  if (!user) return null
  const name = user.displayName || user.email || "Account"

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted">
        {user.photoURL ? (
          <img
            src={user.photoURL || "/placeholder.svg?height=24&width=24&query=user%20avatar"}
            alt="Avatar"
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <User className="h-4 w-4" />
        )}
        <span className="text-sm">{name}</span>
      </div>
      <Button variant="outline" onClick={onOpenManager}>
        My CVs
      </Button>
      <Button variant="outline" onClick={signOutUser} title="Sign out">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}
