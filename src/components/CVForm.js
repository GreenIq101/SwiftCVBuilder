"use client"

import { useMemo, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Plus, Trash2, ArrowUp, ArrowDown, ImagePlus } from "lucide-react"

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
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {formData.photo ? (
            <img
              src={formData.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover border"
            />
          ) : (
            <div className="h-16 w-16 rounded-full border flex items-center justify-center text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
          <div>
            <Label className="mb-1 block">Profile Photo</Label>
            <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input
              placeholder="Your full name"
              value={formData.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
            />
            {emailError ? (
              <p id="email-error" className="text-xs text-red-600">
                {emailError}
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              placeholder="+1 555 000 0000"
              value={formData.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>About Me</Label>
            <Textarea
              placeholder="A brief professional summary"
              rows={4}
              value={formData.summary || ""}
              onChange={(e) => updateField("summary", e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  if (section === "education") {
    const list = formData.education || []
    return (
      <div className="space-y-4">
        {list.map((edu, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Education Level</Label>
                <Input
                  placeholder="Bachelor's, Master's, etc."
                  value={edu.level}
                  onChange={(e) => updateList("education", i, "level", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Institution</Label>
                <Input
                  placeholder="University / College"
                  value={edu.organization}
                  onChange={(e) => updateList("education", i, "organization", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Start</Label>
                <Input
                  placeholder="2018"
                  value={edu.startDate}
                  onChange={(e) => updateList("education", i, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>End</Label>
                <Input
                  placeholder="2022"
                  value={edu.endDate}
                  onChange={(e) => updateList("education", i, "endDate", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("education", i, i - 1)}
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("education", i, i + 1)}
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeListItem("education", i)}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => addListItem("education", { level: "", organization: "", startDate: "", endDate: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add education
        </Button>
      </div>
    )
  }

  if (section === "experience") {
    const list = formData.experiences || []
    return (
      <div className="space-y-4">
        {list.map((exp, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Job Title</Label>
                <Input
                  placeholder="Frontend Engineer"
                  value={exp.title}
                  onChange={(e) => updateList("experiences", i, "title", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Company</Label>
                <Input
                  placeholder="Company Inc."
                  value={exp.company}
                  onChange={(e) => updateList("experiences", i, "company", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Duration</Label>
                <Input
                  placeholder="2020 - 2023"
                  value={exp.duration}
                  onChange={(e) => updateList("experiences", i, "duration", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Key responsibilities and achievements"
                  rows={4}
                  value={exp.description}
                  onChange={(e) => updateList("experiences", i, "description", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("experiences", i, i - 1)}
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("experiences", i, i + 1)}
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeListItem("experiences", i)}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => addListItem("experiences", { title: "", company: "", duration: "", description: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add experience
        </Button>
      </div>
    )
  }

  if (section === "projects") {
    const list = formData.projects || []
    return (
      <div className="space-y-4">
        {list.map((proj, i) => (
          <div key={i} className="rounded-md border p-3 space-y-2">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Project Name</Label>
                <Input
                  placeholder="My Awesome App"
                  value={proj.name}
                  onChange={(e) => updateList("projects", i, "name", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Link</Label>
                <Input
                  placeholder="https://..."
                  value={proj.link}
                  onChange={(e) => updateList("projects", i, "link", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="What it does, stack, your role"
                  rows={4}
                  value={proj.description}
                  onChange={(e) => updateList("projects", i, "description", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("projects", i, i - 1)}
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveListItem("projects", i, i + 1)}
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeListItem("projects", i)}
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={() => addListItem("projects", { name: "", description: "", link: "" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add project
        </Button>
      </div>
    )
  }

  if (section === "skills") {
    return (
      <div className="space-y-4">
        <Label className="block">Skills</Label>
        <TagInput
          value={formData.skills || ""}
          onChange={(val) => updateField("skills", val)}
          placeholder="Type a skill and press Enter"
        />
        <Separator />
        <p className="text-xs text-muted-foreground">Tip: Use Enter or comma to add. Click a tag to remove it.</p>
      </div>
    )
  }

  if (section === "hobbies") {
    return (
      <div className="space-y-4">
        <Label className="block">Hobbies</Label>
        <TagInput
          value={formData.hobbies || ""}
          onChange={(val) => updateField("hobbies", val)}
          placeholder="Type a hobby and press Enter"
        />
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
