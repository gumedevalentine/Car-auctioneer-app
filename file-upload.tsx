"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText, ImageIcon, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function FileUpload({ onFilesChange, maxFiles = 5, acceptedTypes = ["image/*", ".pdf"] }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return

      const fileArray = Array.from(newFiles)
      const validFiles = fileArray.filter((file) => {
        const isValidType = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          }
          return file.type.match(type.replace("*", ".*"))
        })
        return isValidType && file.size <= 10 * 1024 * 1024 // 10MB limit
      })

      const updatedFiles = [...files, ...validFiles].slice(0, maxFiles)
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    },
    [files, maxFiles, acceptedTypes, onFilesChange],
  )

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Proof of Payment</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your bank transfer receipt, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer bg-transparent">
              Choose Files
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted: Images, PDF • Max size: 10MB • Max files: {maxFiles}
          </p>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files ({files.length})</h4>
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file)}
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Upload Requirements:</p>
            <ul className="text-blue-700 mt-1 space-y-1">
              <li>• Bank transfer receipt or confirmation</li>
              <li>• Must show transfer amount and reference number</li>
              <li>• Clear and readable document/screenshot</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
