"use client"

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"

export function useToast() {
  return {
    toast: ({ title, description, ...opts } = {}) => {
      if (typeof title === "string" && !description && Object.keys(opts || {}).length === 0) return sonnerToast(title)
      return sonnerToast(title || "", { description, ...opts })
    },
  }
}
export function Toaster(props) {
  return <SonnerToaster richColors closeButton position="top-right" {...props} />
}
