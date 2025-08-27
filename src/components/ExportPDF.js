"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import {
  Download,
  FileText,
  Image,
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  X
} from "lucide-react"

export default function ExportPDF({
  open = false,
  onClose = () => {},
  formData = {},
  template = "classic",
  onPrint = () => {},
}) {
  const [exportOptions, setExportOptions] = useState({
    format: 'pdf',
    quality: 'high',
    includePhotos: true,
    pageSize: 'a4',
    margins: 'normal',
    colorMode: 'color'
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  if (!open) return null

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: FileText, description: 'Standard PDF format' },
    { value: 'png', label: 'PNG Image', icon: Image, description: 'High-quality image' },
    { value: 'jpg', label: 'JPG Image', icon: Image, description: 'Compressed image' },
  ]

  const qualityOptions = [
    { value: 'low', label: 'Low (Faster)', multiplier: 1 },
    { value: 'medium', label: 'Medium', multiplier: 1.5 },
    { value: 'high', label: 'High (Best)', multiplier: 2 },
  ]

  const pageSizes = [
    { value: 'a4', label: 'A4 (210×297mm)', dimensions: '210×297mm' },
    { value: 'letter', label: 'Letter (8.5×11")', dimensions: '8.5×11"' },
    { value: 'a3', label: 'A3 (297×420mm)', dimensions: '297×420mm' },
  ]

  const marginOptions = [
    { value: 'none', label: 'No Margins' },
    { value: 'narrow', label: 'Narrow (0.5")' },
    { value: 'normal', label: 'Normal (1")' },
    { value: 'wide', label: 'Wide (1.5")' },
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      // Simulate export progress
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      if (exportOptions.format === 'pdf') {
        // Enhanced PDF export with custom options
        await exportAsPDF()
      } else {
        // Image export
        await exportAsImage()
      }

      setExportProgress(100)
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
        onClose()
      }, 500)
    } catch (error) {
      console.error('Export failed:', error)
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const exportAsPDF = async () => {
    const preview = document.getElementById("preview")
    if (!preview) throw new Error('Preview not found')

    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    const canvas = await html2canvas(preview, {
      scale: qualityOptions.find(q => q.value === exportOptions.quality)?.multiplier || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: preview.scrollWidth,
      height: preview.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: exportOptions.pageSize
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = (pdfHeight - imgHeight * ratio) / 2

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

    const fileName = `${formData.name || 'resume'}_${template}_${exportOptions.quality}.pdf`
    pdf.save(fileName)
  }

  const exportAsImage = async () => {
    const preview = document.getElementById("preview")
    if (!preview) throw new Error('Preview not found')

    const html2canvas = (await import('html2canvas')).default

    const canvas = await html2canvas(preview, {
      scale: qualityOptions.find(q => q.value === exportOptions.quality)?.multiplier || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: exportOptions.colorMode === 'color' ? null : '#ffffff',
    })

    const link = document.createElement('a')
    const fileName = `${formData.name || 'resume'}_${template}_${exportOptions.quality}.${exportOptions.format}`

    link.download = fileName
    link.href = canvas.toDataURL(`image/${exportOptions.format}`)
    link.click()
  }

  return (
    <div className="fullscreen-overlay animate-in-fade">
      <div className="fullscreen-toolbar">
        <div className="toolbar-left">
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close export dialog"
            className="btn-enhanced"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="toolbar-center">
          <h2 className="text-lg font-semibold">Export Resume</h2>
        </div>

        <div className="toolbar-right">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-enhanced primary-btn"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting... {exportProgress}%
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {exportOptions.format.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="fullscreen-content">
        <div className="export-grid animate-in-scale">
          {/* Format Selection */}
          <Card className="export-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <FileText className="h-5 w-5 text-primary" />
                Export Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {exportFormats.map((format) => {
                  const Icon = format.icon
                  return (
                    <button
                      key={format.value}
                      onClick={() => setExportOptions({ ...exportOptions, format: format.value })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        exportOptions.format === format.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-medium">{format.label}</div>
                          <div className="text-sm text-muted-foreground">{format.description}</div>
                        </div>
                        {exportOptions.format === format.value && (
                          <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quality Settings */}
          <Card className="export-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <Settings className="h-5 w-5 text-primary" />
                Quality Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Resolution Quality</label>
                <div className="flex gap-2">
                  {qualityOptions.map((quality) => (
                    <button
                      key={quality.value}
                      onClick={() => setExportOptions({ ...exportOptions, quality: quality.value })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        exportOptions.quality === quality.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">Page Size</label>
                <div className="space-y-2">
                  {pageSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setExportOptions({ ...exportOptions, pageSize: size.value })}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        exportOptions.pageSize === size.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{size.label}</div>
                      <div className="text-sm text-muted-foreground">{size.dimensions}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">Margins</label>
                <div className="grid grid-cols-2 gap-2">
                  {marginOptions.map((margin) => (
                    <button
                      key={margin.value}
                      onClick={() => setExportOptions({ ...exportOptions, margins: margin.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        exportOptions.margins === margin.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {margin.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview & Options */}
          <Card className="export-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <CheckCircle className="h-5 w-5 text-primary" />
                Export Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="export-summary p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Export Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">{exportOptions.format.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium">{exportOptions.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page Size:</span>
                      <span className="font-medium">{exportOptions.pageSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margins:</span>
                      <span className="font-medium">{exportOptions.margins}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-900 dark:text-blue-100">Export Tips</div>
                    <div className="text-blue-700 dark:text-blue-300 mt-1">
                      High quality recommended for printing. PDF format preserves formatting best.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}