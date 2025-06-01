// src/components/ui/radio-group.jsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const RadioGroup = ({ options = [], name, selected, onChange }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
            className="h-4 w-4 text-primary focus:ring-primary"
          />
          <span className="text-sm text-foreground">{option.label}</span>
        </label>
      ))}
    </div>
  )
}
export { RadioGroup }