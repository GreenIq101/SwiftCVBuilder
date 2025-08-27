"use client"

import { useMemo, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Plus, Trash2, ArrowUp, ArrowDown, ImagePlus, CheckCircle, AlertCircle } from "lucide-react"

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
      <div className="space-y-6 animate-in-fade">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-border hover:border-primary/50 transition-colors">
          {formData.photo ? (
            <div className="relative group">
              <img
                src={formData.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
                alt="Profile"
                className="h-20 w-20 rounded-xl object-cover border-2 border-border shadow-sm"
              />
              <button
                onClick={() => updateField("photo", "")}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="h-20 w-20 rounded-xl border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground bg-muted/30">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1">
            <Label className="mb-2 block font-medium">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF (max 5MB)</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Full Name
              {hasValidName && <CheckCircle className="h-4 w-4 text-green-500" />}
            </Label>
            <Input
              placeholder="Your full name"
              value={formData.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className={`transition-all ${hasValidName ? 'border-green-500/50 focus:border-green-500' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Email Address
              {hasValidEmail && <CheckCircle className="h-4 w-4 text-green-500" />}
              {emailTouched && !hasValidEmail && <AlertCircle className="h-4 w-4 text-red-500" />}
            </Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              className={`transition-all ${
                emailTouched && !hasValidEmail ? 'border-red-500/50 focus:border-red-500' :
                hasValidEmail ? 'border-green-500/50 focus:border-green-500' : ''
              }`}
            />
            {emailError ? (
              <p id="email-error" className="text-xs text-red-600 flex items-center gap-1 animate-in-up">
                <AlertCircle className="h-3 w-3" />
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Phone Number
              {hasValidPhone && <CheckCircle className="h-4 w-4 text-green-500" />}
            </Label>
            <Input
              placeholder="+1 555 000 0000"
              value={formData.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`transition-all ${hasValidPhone ? 'border-green-500/50 focus:border-green-500' : ''}`}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2">
              Professional Summary
              <span className="text-xs text-muted-foreground font-normal">
                ({(formData.summary || "").length}/500 characters)
              </span>
            </Label>
            <Textarea
              placeholder="A brief professional summary highlighting your key strengths and career goals..."
              rows={4}
              maxLength={500}
              value={formData.summary || ""}
              onChange={(e) => updateField("summary", e.target.value)}
              className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
          <div className="flex gap-1">
            {[hasValidName, hasValidEmail, hasValidPhone].map((valid, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  valid ? 'bg-green-500' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {[hasValidName, hasValidEmail, hasValidPhone].filter(Boolean).length}/3 required fields completed
          </span>
        </div>
      </div>
    )
  }

  if (section === "education") {
    const list = formData.education || []
    return (
      <div className="space-y-4 animate-in-fade">
        {list.map((edu, i) => (
          <div key={i} className="group relative rounded-xl border border-border bg-card/50 p-4 space-y-4 hover:shadow-md transition-all duration-200 animate-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            {/* Header with index and actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-muted-foreground">Education Entry</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => moveListItem("education", i, i - 1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="h-8 w-8"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => moveListItem("education", i, i + 1)}
                  disabled={i === list.length - 1}
                  aria-label="Move down"
                  className="h-8 w-8"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeListItem("education", i)}
                  aria-label="Delete"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Degree & Field</Label>
                <Input
                  placeholder="Bachelor's in Computer Science"
                  value={edu.level}
                  onChange={(e) => updateList("education", i, "level", e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Institution</Label>
                <Input
                  placeholder="Harvard University"
                  value={edu.organization}
                  onChange={(e) => updateList("education", i, "organization", e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Year</Label>
                <Input
                  placeholder="2018"
                  value={edu.startDate}
                  onChange={(e) => updateList("education", i, "startDate", e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">End Year</Label>
                <Input
                  placeholder="2022"
                  value={edu.endDate}
                  onChange={(e) => updateList("education", i, "endDate", e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Completion indicator */}
            {edu.level && edu.organization && (edu.startDate || edu.endDate) && (
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Entry complete</span>
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={() => addListItem("education", { level: "", organization: "", startDate: "", endDate: "" })}
          className="w-full border-dashed border-2 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>

        {list.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm">No education entries yet</p>
            <p className="text-xs">Click "Add Education" to get started</p>
          </div>
        )}
      </div>
    )
  }

  if (section === "experience") {
    const list = formData.experiences || []
    return (
      <div className="space-y-4 animate-in-fade">
        {list.map((exp, i) => {
          const isComplete = exp.title && exp.company && exp.duration
          return (
            <div key={i} className="group relative rounded-xl border border-border bg-card/50 p-4 space-y-4 hover:shadow-md transition-all duration-200 animate-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              {/* Header with index and actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Work Experience</span>
                  {isComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveListItem("experiences", i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="h-8 w-8"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveListItem("experiences", i, i + 1)}
                    disabled={i === list.length - 1}
                    aria-label="Move down"
                    className="h-8 w-8"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeListItem("experiences", i)}
                    aria-label="Delete"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Job Title</Label>
                  <Input
                    placeholder="Senior Frontend Engineer"
                    value={exp.title}
                    onChange={(e) => updateList("experiences", i, "title", e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company</Label>
                  <Input
                    placeholder="Tech Corp Inc."
                    value={exp.company}
                    onChange={(e) => updateList("experiences", i, "company", e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">Duration</Label>
                  <Input
                    placeholder="Jan 2020 - Dec 2023"
                    value={exp.duration}
                    onChange={(e) => updateList("experiences", i, "duration", e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Description
                    <span className="text-xs text-muted-foreground font-normal">
                      ({(exp.description || "").length}/1000 characters)
                    </span>
                  </Label>
                  <Textarea
                    placeholder="Describe your key responsibilities, achievements, and impact..."
                    rows={4}
                    maxLength={1000}
                    value={exp.description}
                    onChange={(e) => updateList("experiences", i, "description", e.target.value)}
                    className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Completion indicator */}
              {isComplete && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Entry complete</span>
                </div>
              )}
            </div>
          )
        })}

        <Button
          variant="outline"
          onClick={() => addListItem("experiences", { title: "", company: "", duration: "", description: "" })}
          className="w-full border-dashed border-2 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Work Experience
        </Button>

        {list.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm">No work experience entries yet</p>
            <p className="text-xs">Click "Add Work Experience" to get started</p>
          </div>
        )}
      </div>
    )
  }

  if (section === "projects") {
    const list = formData.projects || []
    return (
      <div className="space-y-4 animate-in-fade">
        {list.map((proj, i) => {
          const isComplete = proj.name && proj.description
          return (
            <div key={i} className="group relative rounded-xl border border-border bg-card/50 p-4 space-y-4 hover:shadow-md transition-all duration-200 animate-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              {/* Header with index and actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Project</span>
                  {isComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveListItem("projects", i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="h-8 w-8"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => moveListItem("projects", i, i + 1)}
                    disabled={i === list.length - 1}
                    aria-label="Move down"
                    className="h-8 w-8"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeListItem("projects", i)}
                    aria-label="Delete"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Project Name</Label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={proj.name}
                    onChange={(e) => updateList("projects", i, "name", e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Project Link</Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={proj.link}
                    onChange={(e) => updateList("projects", i, "link", e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Description
                    <span className="text-xs text-muted-foreground font-normal">
                      ({(proj.description || "").length}/800 characters)
                    </span>
                  </Label>
                  <Textarea
                    placeholder="Describe the project, technologies used, your role, and key features..."
                    rows={4}
                    maxLength={800}
                    value={proj.description}
                    onChange={(e) => updateList("projects", i, "description", e.target.value)}
                    className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Completion indicator */}
              {isComplete && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Entry complete</span>
                </div>
              )}
            </div>
          )
        })}

        <Button
          variant="outline"
          onClick={() => addListItem("projects", { name: "", description: "", link: "" })}
          className="w-full border-dashed border-2 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>

        {list.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm">No projects added yet</p>
            <p className="text-xs">Click "Add Project" to showcase your work</p>
          </div>
        )}
      </div>
    )
  }

  if (section === "skills") {
    const skillsCount = (formData.skills || "").split(",").filter(s => s.trim()).length
    return (
      <div className="space-y-6 animate-in-fade">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg font-semibold">Skills & Technologies</Label>
            <p className="text-sm text-muted-foreground mt-1">Showcase your technical expertise</p>
          </div>
          {skillsCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              {skillsCount} skill{skillsCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <TagInput
            value={formData.skills || ""}
            onChange={(val) => updateField("skills", val)}
            placeholder="e.g., JavaScript, React, Node.js, Python..."
          />
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Tips for better skills section:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Include both technical and soft skills</li>
                <li>• Use industry-standard terminology</li>
                <li>• Prioritize most relevant skills first</li>
                <li>• Keep it concise (8-12 key skills)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === "hobbies") {
    const hobbiesCount = (formData.hobbies || "").split(",").filter(s => s.trim()).length
    return (
      <div className="space-y-6 animate-in-fade">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg font-semibold">Interests & Hobbies</Label>
            <p className="text-sm text-muted-foreground mt-1">Show your personality and work-life balance</p>
          </div>
          {hobbiesCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              {hobbiesCount} interest{hobbiesCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <TagInput
            value={formData.hobbies || ""}
            onChange={(val) => updateField("hobbies", val)}
            placeholder="e.g., Reading, Photography, Hiking, Cooking..."
          />
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Why include hobbies?</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Shows well-rounded personality</li>
                <li>• Demonstrates work-life balance</li>
                <li>• Can be conversation starters in interviews</li>
                <li>• Keep it professional and relevant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function TagInput({ value = "", onChange = () => {}, placeholder = "Add item" }) {
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
  const removeToken = (tok) => onChange(tokens.filter((t) => t !== tok).join(", "))
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addToken(draft)
    } else if (e.key === "Backspace" && !draft && tokens.length) {
      removeToken(tokens[tokens.length - 1])
    }
  }

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-2">
      {tokens.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => removeToken(t)}
          className="rounded-full bg-secondary px-3 py-1 text-sm hover:bg-secondary/80"
          aria-label={`Remove ${t}`}
        >
          {t}
        </button>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="min-w-[10ch] flex-1 outline-none text-sm p-1 bg-transparent"
      />
    </div>
  )
}
