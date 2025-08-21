"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Trash2, FilePlus2, Save, Download, FolderOpenDot, Pencil } from "lucide-react"
import { listenResumes, createResume, updateResume, deleteResume, getResume } from "../firebase"

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirmation-dialog">
    <p>{message}</p>
    <div className="flex gap-2">
      <Button onClick={onConfirm}>Yes</Button>
      <Button variant="outline" onClick={onCancel}>No</Button>
    </div>
  </div>
)

export default function CVManager({
  open = false,
  onClose = () => {},
  user = null,
  currentResumeId = null,
  formData = {},
  template = "classic",
  setFormData = () => {},
  setTemplate = () => {},
  setCurrentResumeId = () => {},
}) {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState("")
  const [busy, setBusy] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(null)

  useEffect(() => {
    if (!open || !user) return
    const unsub = listenResumes(user.uid, setItems)
    return () => unsub()
  }, [open, user])

  const filtered = useMemo(() => {
    const q = filter.toLowerCase()
    return items.filter((i) => i.name?.toLowerCase().includes(q))
  }, [items, filter])

  if (!open) return null

  const onNew = async () => {
    const name = prompt("Name for new resume?")
    if (!name) return
    setBusy(true)
    try {
      const id = await createResume(user.uid, {
        name,
        data: formData,
        template,
      })
      setCurrentResumeId(id)
    } finally {
      setBusy(false)
    }
  }

  const onSave = async () => {
    setBusy(true)
    try {
      if (currentResumeId) {
        await updateResume(currentResumeId, { data: formData, template })
      } else {
        const name = prompt("Name for this resume?")
        if (!name) return
        const id = await createResume(user.uid, { name, data: formData, template })
        setCurrentResumeId(id)
      }
      alert("Saved")
    } finally {
      setBusy(false)
    }
  }

  const onSaveAs = async () => {
    const name = prompt("Save as (new name):")
    if (!name) return
    setBusy(true)
    try {
      const id = await createResume(user.uid, { name, data: formData, template })
      setCurrentResumeId(id)
      alert("Saved")
    } finally {
      setBusy(false)
    }
  }

  const onLoad = async (id) => {
    setBusy(true)
    try {
      const doc = await getResume(id)
      if (doc) {
        setFormData({ ...(doc.data || {}) })
        setTemplate(doc.template || "classic")
        setCurrentResumeId(doc.id)
      }
      onClose()
    } finally {
      setBusy(false)
    }
  }

  const onRename = async (id, prev) => {
    const name = prompt("Rename resume to:", prev || "Untitled")
    if (!name) return
    setBusy(true)
    try {
      await updateResume(id, { name })
    } finally {
      setBusy(false)
    }
  }

  const handleDeleteResume = (id) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this resume?",
      onConfirm: async () => {
        setConfirmDialog(null)
        setBusy(true)
        try {
          await deleteResume(id)
          if (currentResumeId === id) setCurrentResumeId(null)
        } finally {
          setBusy(false)
        }
      },
      onCancel: () => setConfirmDialog(null),
    })
  }

  return (
    <>
      {confirmDialog && (
        <ConfirmationDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
      <div className="overlay" role="dialog" aria-modal="true" aria-label="Manage CVs">
        <div className="overlay-toolbar">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="overlay-content">
          <div className="overlay-surface" style={{ maxWidth: 960 }}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Your CVs</h2>
              <div className="flex gap-2">
                <Button onClick={onNew} disabled={busy}>
                  <FilePlus2 className="h-4 w-4 mr-2" />
                  New
                </Button>
                <Button onClick={onSave} disabled={busy}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={onSaveAs} disabled={busy}>
                  <Download className="h-4 w-4 mr-2" />
                  Save As
                </Button>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center gap-2 mb-3">
              <Input placeholder="Filter by name..." value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-md border p-3 elevated">
                  <div className="font-medium text-sm">{r.name || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.template || "classic"} {currentResumeId === r.id ? " • current" : ""}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button className="flex-1" onClick={() => onLoad(r.id)} disabled={busy}>
                      <FolderOpenDot className="h-4 w-4 mr-2" />
                      Load
                    </Button>
                    <Button variant="outline" onClick={() => onRename(r.id, r.name)} disabled={busy} title="Rename">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteResume(r.id)} disabled={busy} title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {!filtered.length ? <p className="text-sm text-muted-foreground">No resumes yet.</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
