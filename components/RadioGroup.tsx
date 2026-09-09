interface RadioGroupProps<T extends number | string> {
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
}

export default function RadioGroup<T extends number | string>({ options, value, onChange }: RadioGroupProps<T>) {
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
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}