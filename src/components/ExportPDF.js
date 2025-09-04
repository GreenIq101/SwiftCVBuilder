"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  Image,
  Settings,
  CheckCircle,
  AlertCircle,
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
    <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}} role="dialog">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          {/* Modal Header */}
          <div className="modal-header bg-white border-0">
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
              <Download style={{width: "20px", height: "20px"}} className="text-primary" />
              Export Resume
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Format Selection */}
              <div className="col-lg-4">
                <div className="card card-modern h-100 border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <h6 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
                      <FileText style={{width: "18px", height: "18px"}} className="text-primary" />
                      Export Format
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      {exportFormats.map((format) => {
                        const Icon = format.icon
                        return (
                          <button
                            key={format.value}
                            onClick={() => setExportOptions({ ...exportOptions, format: format.value })}
                            className={`btn border-2 rounded-3 p-3 text-start transition-all ${
                              exportOptions.format === format.value
                                ? 'border-primary bg-primary bg-opacity-10'
                                : 'border-light hover-border-primary'
                            }`}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <Icon style={{width: "24px", height: "24px"}} className="text-primary" />
                              <div className="flex-grow-1">
                                <div className="fw-semibold">{format.label}</div>
                                <small className="text-muted">{format.description}</small>
                              </div>
                              {exportOptions.format === format.value && (
                                <CheckCircle style={{width: "20px", height: "20px"}} className="text-primary" />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Settings */}
              <div className="col-lg-4">
                <div className="card card-modern h-100 border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <h6 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
                      <Settings style={{width: "18px", height: "18px"}} className="text-primary" />
                      Quality Settings
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label fw-semibold small">Resolution Quality</label>
                      <div className="d-flex gap-2">
                        {qualityOptions.map((quality) => (
                          <button
                            key={quality.value}
                            onClick={() => setExportOptions({ ...exportOptions, quality: quality.value })}
                            className={`btn flex-fill border-2 rounded-3 transition-all ${
                              exportOptions.quality === quality.value
                                ? 'border-primary bg-primary bg-opacity-10'
                                : 'border-light hover-border-primary'
                            }`}
                          >
                            {quality.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <hr />

                    <div className="mb-4">
                      <label className="form-label fw-semibold small">Page Size</label>
                      <div className="d-grid gap-2">
                        {pageSizes.map((size) => (
                          <button
                            key={size.value}
                            onClick={() => setExportOptions({ ...exportOptions, pageSize: size.value })}
                            className={`btn border-2 rounded-3 p-3 text-start transition-all ${
                              exportOptions.pageSize === size.value
                                ? 'border-primary bg-primary bg-opacity-10'
                                : 'border-light hover-border-primary'
                            }`}
                          >
                            <div className="fw-semibold">{size.label}</div>
                            <small className="text-muted">{size.dimensions}</small>
                          </button>
                        ))}
                      </div>
                    </div>

                    <hr />

                    <div>
                      <label className="form-label fw-semibold small">Margins</label>
                      <div className="row g-2">
                        {marginOptions.map((margin) => (
                          <div key={margin.value} className="col-6">
                            <button
                              onClick={() => setExportOptions({ ...exportOptions, margins: margin.value })}
                              className={`btn w-100 border-2 rounded-3 transition-all ${
                                exportOptions.margins === margin.value
                                  ? 'border-primary bg-primary bg-opacity-10'
                                  : 'border-light hover-border-primary'
                              }`}
                            >
                              {margin.label}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview & Options */}
              <div className="col-lg-4">
                <div className="card card-modern h-100 border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <h6 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
                      <CheckCircle style={{width: "18px", height: "18px"}} className="text-primary" />
                      Export Preview
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="bg-light bg-opacity-50 rounded-3 p-3 mb-4">
                      <h6 className="fw-semibold mb-3">Export Summary</h6>
                      <div className="small">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Format:</span>
                          <span className="fw-semibold">{exportOptions.format.toUpperCase()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Quality:</span>
                          <span className="fw-semibold">{exportOptions.quality}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Page Size:</span>
                          <span className="fw-semibold">{exportOptions.pageSize}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Margins:</span>
                          <span className="fw-semibold">{exportOptions.margins}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-info bg-opacity-10 border border-info rounded-3 p-3">
                      <div className="d-flex gap-2">
                        <AlertCircle style={{width: "16px", height: "16px"}} className="text-info flex-shrink-0 mt-1" />
                        <div className="small">
                          <div className="fw-semibold text-info mb-1">Export Tips</div>
                          <div className="text-info">
                            High quality recommended for printing. PDF format preserves formatting best.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer border-0 bg-light">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <X style={{width: "16px", height: "16px"}} className="me-2" />
              Close
            </button>
            <button
              type="button"
              className="btn btn-gradient"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Exporting... {exportProgress}%
                </>
              ) : (
                <>
                  <Download style={{width: "16px", height: "16px"}} className="me-2" />
                  Export {exportOptions.format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}