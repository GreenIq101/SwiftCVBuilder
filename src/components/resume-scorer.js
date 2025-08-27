"use client"

import { useState, useMemo } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Separator } from "./ui/separator"
import {
  X,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Star,
  Award,
  Lightbulb
} from "lucide-react"

export default function ResumeScorer({
  open = false,
  onClose = () => {},
  formData = {},
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analysis = useMemo(() => {
    if (!formData || !open) return null

    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => setIsAnalyzing(false), 1500)

    const scores = {
      overall: 0,
      content: 0,
      structure: 0,
      keywords: 0,
      formatting: 0
    }

    const feedback = {
      strengths: [],
      improvements: [],
      tips: []
    }

    // Content Quality Analysis
    const hasName = (formData.name || "").trim().length > 0
    const hasEmail = /\S+@\S+\.\S+/.test(formData.email || "")
    const hasPhone = (formData.phone || "").trim().length >= 7
    const hasSummary = (formData.summary || "").trim().length > 50
    const hasEducation = (formData.education || []).length > 0
    const hasExperience = (formData.experiences || []).length > 0
    const hasSkills = (formData.skills || "").trim().length > 0

    // Basic info completeness
    const basicInfoScore = [hasName, hasEmail, hasPhone].filter(Boolean).length / 3
    scores.content += basicInfoScore * 25

    if (hasName && hasEmail && hasPhone) {
      feedback.strengths.push("Complete contact information")
    } else {
      feedback.improvements.push("Add complete contact information")
    }

    // Summary quality
    if (hasSummary) {
      const summaryLength = (formData.summary || "").length
      if (summaryLength > 100) {
        scores.content += 20
        feedback.strengths.push("Detailed professional summary")
      } else {
        scores.content += 10
        feedback.improvements.push("Expand your professional summary")
      }
    } else {
      feedback.improvements.push("Add a professional summary")
    }

    // Experience analysis
    if (hasExperience) {
      const experiences = formData.experiences || []
      const avgDescriptionLength = experiences.reduce((sum, exp) =>
        sum + (exp.description || "").length, 0) / experiences.length

      if (avgDescriptionLength > 100) {
        scores.content += 25
        feedback.strengths.push("Detailed work experience descriptions")
      } else {
        scores.content += 15
        feedback.improvements.push("Add more detail to work experience descriptions")
      }

      if (experiences.length >= 3) {
        feedback.strengths.push("Good work history length")
      }
    } else {
      feedback.improvements.push("Add work experience")
    }

    // Education
    if (hasEducation) {
      scores.content += 15
      feedback.strengths.push("Education background included")
    } else {
      feedback.improvements.push("Add education information")
    }

    // Skills
    if (hasSkills) {
      const skillCount = (formData.skills || "").split(",").length
      if (skillCount >= 5) {
        scores.content += 15
        feedback.strengths.push("Good variety of skills listed")
      } else {
        scores.content += 10
        feedback.improvements.push("Add more relevant skills")
      }
    } else {
      feedback.improvements.push("Add skills section")
    }

    // Structure Analysis
    scores.structure = 70 // Base score for having sections

    if (hasSummary) scores.structure += 10
    if (hasExperience) scores.structure += 10
    if (hasEducation) scores.structure += 10

    // Keywords Analysis (basic)
    const text = [
      formData.summary || "",
      ...(formData.experiences || []).map(e => e.description || ""),
      formData.skills || ""
    ].join(" ").toLowerCase()

    const actionWords = ["led", "managed", "developed", "created", "implemented", "optimized", "improved", "achieved"]
    const keywordMatches = actionWords.filter(word => text.includes(word)).length

    scores.keywords = Math.min((keywordMatches / actionWords.length) * 100, 100)

    // Formatting Analysis
    scores.formatting = 80 // Base score

    if (formData.photo) scores.formatting += 10
    if ((formData.projects || []).length > 0) scores.formatting += 10

    // Overall score calculation
    scores.overall = Math.round((scores.content + scores.structure + scores.keywords + scores.formatting) / 4)

    // Generate tips
    feedback.tips = [
      "Use action verbs like 'developed', 'managed', 'optimized' to describe achievements",
      "Quantify your accomplishments with numbers when possible",
      "Tailor your resume for each job application",
      "Keep your resume to 1-2 pages",
      "Use a clean, professional format",
      "Include relevant keywords from the job description"
    ]

    return { scores, feedback }
  }, [formData, open])

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return <Award className="h-5 w-5 text-green-600" />
    if (score >= 60) return <TrendingUp className="h-5 w-5 text-yellow-600" />
    return <AlertTriangle className="h-5 w-5 text-red-600" />
  }

  if (!open) return null

  return (
    <div className="fullscreen-overlay animate-in-fade">
      <div className="fullscreen-toolbar">
        <div className="toolbar-left">
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close resume scorer"
            className="btn-enhanced"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="toolbar-center">
          <h2 className="text-lg font-semibold">Resume Score & Tips</h2>
        </div>

        <div className="toolbar-right">
          <div className="flex items-center gap-2">
            {getScoreIcon(analysis?.scores.overall || 0)}
            <span className={`font-bold text-lg ${getScoreColor(analysis?.scores.overall || 0)}`}>
              {analysis?.scores.overall || 0}/100
            </span>
          </div>
        </div>
      </div>

      <div className="fullscreen-content">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg font-medium">Analyzing your resume...</p>
            <p className="text-sm text-muted-foreground mt-2">This will only take a moment</p>
          </div>
        ) : (
          <div className="score-grid animate-in-scale">
            {/* Overall Score */}
            <Card className="score-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heading-md">
                  <Target className="h-5 w-5 text-primary" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(analysis?.scores.overall || 0)} mb-4`}>
                    <span className={`text-3xl font-bold ${getScoreColor(analysis?.scores.overall || 0)}`}>
                      {analysis?.scores.overall || 0}
                    </span>
                  </div>
                  <Progress value={analysis?.scores.overall || 0} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {analysis?.scores.overall >= 80 ? "Excellent! Your resume is well-optimized." :
                     analysis?.scores.overall >= 60 ? "Good job! Some improvements could help." :
                     "Your resume needs significant improvements."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <Card className="score-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heading-md">
                  <Star className="h-5 w-5 text-primary" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'content', label: 'Content Quality', description: 'Completeness and detail of information' },
                  { key: 'structure', label: 'Structure', description: 'Organization and flow' },
                  { key: 'keywords', label: 'Keywords', description: 'Action words and relevant terms' },
                  { key: 'formatting', label: 'Formatting', description: 'Visual presentation and layout' }
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.label}</span>
                      <span className={`font-bold ${getScoreColor(analysis?.scores[item.key] || 0)}`}>
                        {analysis?.scores[item.key] || 0}/100
                      </span>
                    </div>
                    <Progress value={analysis?.scores[item.key] || 0} className="mb-1" />
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="score-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heading-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis?.feedback.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No major strengths identified yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="score-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heading-md">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis?.feedback.improvements.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Great job! No major improvements needed.</p>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="score-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-heading-md">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis?.feedback.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}