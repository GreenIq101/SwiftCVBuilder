"use client"

import { useEffect, useMemo, useState } from "react"
import { Trash2, FilePlus2, Save, Download, FolderOpenDot, Pencil } from "lucide-react"
import { listenResumes, createResume, updateResume, deleteResume, getResume } from "../firebase"

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}} role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center p-4">
          <p className="mb-4">{message}</p>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={onConfirm}>Yes</button>
            <button className="btn btn-outline-secondary" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
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
      <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}} role="dialog" aria-modal="true" aria-label="Manage CVs">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg">
            {/* Modal Header */}
            <div className="modal-header bg-white border-0">
              <h5 className="modal-title fw-bold">Your CVs</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-4">
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" onClick={onNew} disabled={busy}>
                    <FilePlus2 style={{width: "16px", height: "16px"}} className="me-2" />
                    New
                  </button>
                  <button className="btn btn-success" onClick={onSave} disabled={busy}>
                    <Save style={{width: "16px", height: "16px"}} className="me-2" />
                    Save
                  </button>
                  <button className="btn btn-outline-primary" onClick={onSaveAs} disabled={busy}>
                    <Download style={{width: "16px", height: "16px"}} className="me-2" />
                    Save As
                  </button>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by name..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>

              <div className="row g-3">
                {filtered.map((r) => (
                  <div key={r.id} className="col-md-6 col-lg-4">
                    <div className="card card-modern h-100 border-0 shadow-sm">
                      <div className="card-body p-3">
                        <h6 className="card-title fw-semibold mb-1">{r.name || "Untitled"}</h6>
                        <p className="card-text small text-muted mb-3">
                          {r.template || "classic"} {currentResumeId === r.id ? " • current" : ""}
                        </p>
                        <div className="d-flex gap-2">
                          <button className="btn btn-primary flex-fill" onClick={() => onLoad(r.id)} disabled={busy}>
                            <FolderOpenDot style={{width: "14px", height: "14px"}} className="me-1" />
                            Load
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => onRename(r.id, r.name)} disabled={busy} title="Rename">
                            <Pencil style={{width: "14px", height: "14px"}} />
                          </button>
                          <button className="btn btn-outline-danger" onClick={() => handleDeleteResume(r.id)} disabled={busy} title="Delete">
                            <Trash2 style={{width: "14px", height: "14px"}} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!filtered.length && (
                  <div className="col-12">
                    <div className="text-center py-5 text-muted">
                      <p className="mb-0">No resumes yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
