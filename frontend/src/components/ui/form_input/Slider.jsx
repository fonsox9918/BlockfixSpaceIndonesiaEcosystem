// src/components/ui/slider.jsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Slider = ({ value, onChange, min = 0, max = 100 }) => {
  return (
    <input
      type="range"
      className="w-full accent-primary"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  )
}
export { Slider }