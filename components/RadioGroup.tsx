interface RadioGroupProps<T extends number | string> {
  options: { label: string; value: T }[]
  value: T | null
  onChange: (value: T) => void
  // if provided, clicking the selected option deselects it
  onClear?: () => void
}

export default function RadioGroup<T extends number | string>({ options, value, onChange, onClear }: RadioGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map(option => (
        <label
          key={option.value}
          className={`flex-1 text-center py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
            value === option.value
              ? "bg-fairway text-white"
              : "bg-text-dark/10 text-text-dark hover:bg-text-dark/20"
          }`}
        >
          <input
            type="radio"
            className="hidden"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            onClick={() => {
              if (onClear && value === option.value) onClear()
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
