// src/components/ui/file-upload.jsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const FileUpload = ({ onChange }) => {
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files)
    }
  }
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed border-border bg-muted text-sm text-muted-foreground hover:border-primary"
    >
      <label className="cursor-pointer">
        <input type="file" multiple onChange={(e) => onChange(e.target.files)} className="hidden" />
        <span>Drag & drop or click to upload files</span>
      </label>
    </div>
  )
}
export { FileUpload }
