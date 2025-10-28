"use client"

import { useMemo, useState } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown, ImagePlus, CheckCircle, AlertCircle, X } from "lucide-react"

export default function CVForm({ formData = {}, setFormData = () => {}, section = "profile" }) {
  const [emailTouched, setEmailTouched] = useState(false)

  const emailError = useMemo(() => {
    if (!emailTouched) return ""
    if (!formData.email) return "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Enter a valid email"
    return ""
  }, [formData.email, emailTouched])

  const updateField = (name, value) => setFormData({ ...formData, [name]: value })

  const updateList = (key, index, name, value) => {
    const list = [...(formData[key] || [])]
    list[index] = { ...list[index], [name]: value }
    setFormData({ ...formData, [key]: list })
  }

  const addListItem = (key, item) => {
    const list = [...(formData[key] || [])]
    list.push(item)
    setFormData({ ...formData, [key]: list })
  }

  const removeListItem = (key, index) => {
    const list = [...(formData[key] || [])].filter((_, i) => i !== index)
    setFormData({ ...formData, [key]: list })
  }

  const moveListItem = (key, from, to) => {
    const list = [...(formData[key] || [])]
    if (to < 0 || to >= list.length) return
    const [item] = list.splice(from, 1)
    list.splice(to, 0, item)
    setFormData({ ...formData, [key]: list })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setFormData({ ...formData, photo: reader.result })
    reader.readAsDataURL(file)
  }

  if (section === "profile") {
    const hasValidName = (formData.name || "").trim().length > 0
    const hasValidEmail = /\S+@\S+\.\S+/.test(formData.email || "")
    const hasValidPhone = (formData.phone || "").trim().length >= 7

    return (
      <div className="animate-fade-in">
        {/* Profile Photo Section */}
        <div className="border border-dashed border-secondary rounded-3 p-4 mb-4 hover-border-primary transition-all">
          <div className="d-flex align-items-center gap-3">
            {formData.photo ? (
              <div className="position-relative">
                <img
                  src={formData.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
                  alt="Profile"
                  className="rounded-3 object-cover border shadow-sm"
                  style={{ width: "80px", height: "80px" }}
                />
                <button
                  onClick={() => updateField("photo", "")}
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
                  style={{ width: "24px", height: "24px", fontSize: "12px" }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light bg-opacity-50 border border-dashed rounded-3 text-muted"
                style={{ width: "80px", height: "80px" }}
              >
                <ImagePlus className="h-6 w-6" />
              </div>
            )}
            <div className="flex-grow-1">
              <label className="form-label fw-semibold mb-2">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="form-control form-control-sm"
              />
              <small className="text-muted">JPG, PNG or GIF (max 5MB)</small>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 fw-semibold">
                Full Name
                {hasValidName && <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />}
              </label>
              <input
                type="text"
                className={`form-control ${hasValidName ? "is-valid" : ""}`}
                placeholder="Your full name"
                value={formData.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 fw-semibold">
                Email Address
                {hasValidEmail && <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />}
                {emailTouched && !hasValidEmail && (
                  <AlertCircle className="text-danger" style={{ width: "16px", height: "16px" }} />
                )}
              </label>
              <input
                type="email"
                className={`form-control ${emailTouched && !hasValidEmail ? "is-invalid" : hasValidEmail ? "is-valid" : ""}`}
                placeholder="you@example.com"
                value={formData.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <div id="email-error" className="invalid-feedback d-flex align-items-center gap-1">
                  <AlertCircle style={{ width: "12px", height: "12px" }} />
                  {emailError}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 fw-semibold">
                Phone Number
                {hasValidPhone && <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />}
              </label>
              <input
                type="tel"
                className={`form-control ${hasValidPhone ? "is-valid" : ""}`}
                placeholder="+1 555 000 0000"
                value={formData.phone || ""}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 fw-semibold">
                Professional Summary
                <small className="text-muted">({(formData.summary || "").length}/500 characters)</small>
              </label>
              <textarea
                className="form-control"
                placeholder="A brief professional summary highlighting your key strengths and career goals..."
                rows={4}
                maxLength={500}
                value={formData.summary || ""}
                onChange={(e) => updateField("summary", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex gap-1">
              {[hasValidName, hasValidEmail, hasValidPhone].map((valid, i) => (
                <div
                  key={i}
                  className={`rounded-circle ${valid ? "bg-success" : "bg-secondary"}`}
                  style={{ width: "8px", height: "8px" }}
                />
              ))}
            </div>
            <small className="text-muted">
              {[hasValidName, hasValidEmail, hasValidPhone].filter(Boolean).length}/3 required fields completed
            </small>
          </div>
        </div>
      </div>
    )
  }

  if (section === "education") {
    const list = formData.education || []
    return (
      <div className="animate-fade-in">
        {list.map((edu, i) => (
          <div
            key={i}
            className="card card-modern mb-3 shadow-sm animate-slide-in-left"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Header with index and actions */}
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: "24px", height: "24px", fontSize: "12px" }}
                >
                  {i + 1}
                </div>
                <small className="text-muted fw-medium">Education Entry</small>
              </div>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => moveListItem("education", i, i - 1)}
                  disabled={i === 0}
                  aria-label="Move up"
                >
                  <ArrowUp style={{ width: "12px", height: "12px" }} />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => moveListItem("education", i, i + 1)}
                  disabled={i === list.length - 1}
                  aria-label="Move down"
                >
                  <ArrowDown style={{ width: "12px", height: "12px" }} />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeListItem("education", i)}
                  aria-label="Delete education entry"
                >
                  <Trash2 style={{ width: "12px", height: "12px" }} />
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Degree & Field</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bachelor's in Computer Science"
                    value={edu.level}
                    onChange={(e) => updateList("education", i, "level", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Institution</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Harvard University"
                    value={edu.organization}
                    onChange={(e) => updateList("education", i, "organization", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Start Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2018"
                    value={edu.startDate}
                    onChange={(e) => updateList("education", i, "startDate", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">End Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2022"
                    value={edu.endDate}
                    onChange={(e) => updateList("education", i, "endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Completion indicator */}
              {edu.level && edu.organization && (edu.startDate || edu.endDate) && (
                <div className="d-flex align-items-center gap-2 mt-3 pt-3 border-top border-light">
                  <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                  <small className="text-success fw-medium">Entry complete</small>
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          className="btn btn-outline-primary w-100 border-dashed py-3 mb-3"
          onClick={() => addListItem("education", { level: "", organization: "", startDate: "", endDate: "" })}
        >
          <Plus className="me-2" style={{ width: "16px", height: "16px" }} />
          Add Education
        </button>

        {list.length === 0 && (
          <div className="text-center py-5 text-muted">
            <div
              className="bg-light bg-opacity-50 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: "48px", height: "48px" }}
            >
              <Plus style={{ width: "24px", height: "24px" }} />
            </div>
            <p className="mb-1">No education entries yet</p>
            <small>Click "Add Education" to get started</small>
          </div>
        )}
      </div>
    )
  }

  if (section === "experience") {
    const list = formData.experiences || []
    return (
      <div className="animate-fade-in">
        {list.map((exp, i) => {
          const isComplete = exp.title && exp.company && exp.duration
          return (
            <div
              key={i}
              className="card card-modern mb-3 shadow-sm animate-slide-in-left"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Header with index and actions */}
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "24px", height: "24px", fontSize: "12px" }}
                  >
                    {i + 1}
                  </div>
                  <small className="text-muted fw-medium">Work Experience</small>
                  {isComplete && <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />}
                </div>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => moveListItem("experiences", i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    <ArrowUp style={{ width: "12px", height: "12px" }} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => moveListItem("experiences", i, i + 1)}
                    disabled={i === list.length - 1}
                    aria-label="Move down"
                  >
                    <ArrowDown style={{ width: "12px", height: "12px" }} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeListItem("experiences", i)}
                    aria-label="Delete work experience"
                  >
                    <Trash2 style={{ width: "12px", height: "12px" }} />
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Senior Frontend Engineer"
                      value={exp.title}
                      onChange={(e) => updateList("experiences", i, "title", e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tech Corp Inc."
                      value={exp.company}
                      onChange={(e) => updateList("experiences", i, "company", e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jan 2020 - Dec 2023"
                      value={exp.duration}
                      onChange={(e) => updateList("experiences", i, "duration", e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small d-flex align-items-center gap-2">
                      Description
                      <small className="text-muted">({(exp.description || "").length}/1000 characters)</small>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Describe your key responsibilities, achievements, and impact..."
                      rows={4}
                      maxLength={1000}
                      value={exp.description}
                      onChange={(e) => updateList("experiences", i, "description", e.target.value)}
                    />
                  </div>
                </div>

                {/* Completion indicator */}
                {isComplete && (
                  <div className="d-flex align-items-center gap-2 mt-3 pt-3 border-top border-light">
                    <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                    <small className="text-success fw-medium">Entry complete</small>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <button
          className="btn btn-outline-primary w-100 border-dashed py-3 mb-3"
          onClick={() => addListItem("experiences", { title: "", company: "", duration: "", description: "" })}
        >
          <Plus className="me-2" style={{ width: "16px", height: "16px" }} />
          Add Work Experience
        </button>

        {list.length === 0 && (
          <div className="text-center py-5 text-muted">
            <div
              className="bg-light bg-opacity-50 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: "48px", height: "48px" }}
            >
              <Plus style={{ width: "24px", height: "24px" }} />
            </div>
            <p className="mb-1">No work experience entries yet</p>
            <small>Click "Add Work Experience" to get started</small>
          </div>
        )}
      </div>
    )
  }

  if (section === "projects") {
    const list = formData.projects || []
    return (
      <div className="animate-fade-in">
        {list.map((proj, i) => {
          const isComplete = proj.name && proj.description
          return (
            <div
              key={i}
              className="card card-modern mb-3 shadow-sm animate-slide-in-right"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Header with index and actions */}
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "24px", height: "24px", fontSize: "12px" }}
                  >
                    {i + 1}
                  </div>
                  <small className="text-muted fw-medium">Project</small>
                  {isComplete && <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />}
                </div>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => moveListItem("projects", i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    <ArrowUp style={{ width: "12px", height: "12px" }} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => moveListItem("projects", i, i + 1)}
                    disabled={i === list.length - 1}
                    aria-label="Move down"
                  >
                    <ArrowDown style={{ width: "12px", height: "12px" }} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeListItem("projects", i)}
                    aria-label="Delete project"
                  >
                    <Trash2 style={{ width: "12px", height: "12px" }} />
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="E-commerce Platform"
                      value={proj.name}
                      onChange={(e) => updateList("projects", i, "name", e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Project Link</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://github.com/username/project"
                      value={proj.link}
                      onChange={(e) => updateList("projects", i, "link", e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small d-flex align-items-center gap-2">
                      Description
                      <small className="text-muted">({(proj.description || "").length}/800 characters)</small>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Describe the project, technologies used, your role, and key features..."
                      rows={4}
                      maxLength={800}
                      value={proj.description}
                      onChange={(e) => updateList("projects", i, "description", e.target.value)}
                    />
                  </div>
                </div>

                {/* Completion indicator */}
                {isComplete && (
                  <div className="d-flex align-items-center gap-2 mt-3 pt-3 border-top border-light">
                    <CheckCircle className="text-success" style={{ width: "16px", height: "16px" }} />
                    <small className="text-success fw-medium">Entry complete</small>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <button
          className="btn btn-outline-primary w-100 border-dashed py-3 mb-3"
          onClick={() => addListItem("projects", { name: "", description: "", link: "" })}
        >
          <Plus className="me-2" style={{ width: "16px", height: "16px" }} />
          Add Project
        </button>

        {list.length === 0 && (
          <div className="text-center py-5 text-muted">
            <div
              className="bg-light bg-opacity-50 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: "48px", height: "48px" }}
            >
              <Plus style={{ width: "24px", height: "24px" }} />
            </div>
            <p className="mb-1">No projects added yet</p>
            <small>Click "Add Project" to showcase your work</small>
          </div>
        )}
      </div>
    )
  }

  if (section === "skills") {
    const skillsCount = (formData.skills || "").split(",").filter((s) => s.trim()).length
    return (
      <div className="animate-fade-in">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h5 className="fw-bold mb-1">Skills & Technologies</h5>
            <p className="text-muted small mb-0">Showcase your technical expertise</p>
          </div>
          {skillsCount > 0 && (
            <div className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1 px-3 py-2">
              <CheckCircle style={{ width: "14px", height: "14px" }} />
              {skillsCount} skill{skillsCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="mb-4">
          <TagInput
            value={formData.skills || ""}
            onChange={(val) => updateField("skills", val)}
            placeholder="e.g., JavaScript, React, Node.js, Python..."
            onRemoveTag={(tag) => {
              const tokens = (formData.skills || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
              const updated = tokens.filter((t) => t !== tag).join(", ")
              updateField("skills", updated)
            }}
          />
        </div>

        <div className="bg-light bg-opacity-50 rounded-3 p-4 border border-dashed">
          <div className="d-flex gap-3">
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "20px", height: "20px" }}
            >
              <svg
                className="text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ width: "12px", height: "12px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="fw-semibold small mb-2">Tips for better skills section:</p>
              <ul className="text-muted small mb-0">
                <li>Include both technical and soft skills</li>
                <li>Use industry-standard terminology</li>
                <li>Prioritize most relevant skills first</li>
                <li>Keep it concise (8-12 key skills)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === "hobbies") {
    const hobbiesCount = (formData.hobbies || "").split(",").filter((s) => s.trim()).length
    return (
      <div className="animate-fade-in">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h5 className="fw-bold mb-1">Interests & Hobbies</h5>
            <p className="text-muted small mb-0">Show your personality and work-life balance</p>
          </div>
          {hobbiesCount > 0 && (
            <div className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1 px-3 py-2">
              <CheckCircle style={{ width: "14px", height: "14px" }} />
              {hobbiesCount} interest{hobbiesCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="mb-4">
          <TagInput
            value={formData.hobbies || ""}
            onChange={(val) => updateField("hobbies", val)}
            placeholder="e.g., Reading, Photography, Hiking, Cooking..."
            onRemoveTag={(tag) => {
              const tokens = (formData.hobbies || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
              const updated = tokens.filter((t) => t !== tag).join(", ")
              updateField("hobbies", updated)
            }}
          />
        </div>

        <div className="bg-light bg-opacity-50 rounded-3 p-4 border border-dashed">
          <div className="d-flex gap-3">
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "20px", height: "20px" }}
            >
              <svg
                className="text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ width: "12px", height: "12px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <p className="fw-semibold small mb-2">Why include hobbies?</p>
              <ul className="text-muted small mb-0">
                <li>Shows well-rounded personality</li>
                <li>Demonstrates work-life balance</li>
                <li>Can be conversation starters in interviews</li>
                <li>Keep it professional and relevant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function TagInput({ value = "", onChange = () => {}, placeholder = "Add item", onRemoveTag = () => {} }) {
  const tokens = useMemo(
    () =>
      (value || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [value],
  )
  const [draft, setDraft] = useState("")

  const addToken = (tok) => {
    const t = tok.trim()
    if (!t) return
    const set = new Set(tokens)
    set.add(t)
    onChange(Array.from(set).join(", "))
    setDraft("")
  }
  const removeToken = (tok) => {
    onRemoveTag(tok)
    onChange(tokens.filter((t) => t !== tok).join(", "))
  }
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addToken(draft)
    } else if (e.key === "Backspace" && !draft && tokens.length) {
      removeToken(tokens[tokens.length - 1])
    }
  }

  return (
    <div className="border rounded-3 p-3 d-flex flex-wrap gap-2 bg-white">
      {tokens.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => removeToken(t)}
          className="btn btn-sm btn-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1"
          aria-label={`Remove ${t}`}
        >
          {t}
          <X style={{ width: "14px", height: "14px" }} />
        </button>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="form-control form-control-sm border-0 bg-transparent flex-grow-1"
        style={{ minWidth: "120px" }}
      />
    </div>
  )
}
