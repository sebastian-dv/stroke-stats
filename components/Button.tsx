interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

export default function Button({ onClick, children, variant = "primary", className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variant === "primary" ? "bg-green-800 hover:bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-400 text-gray-800"}
        font-semibold py-3 px-6 rounded-xl transition-colors w-full hover:cursor-pointer
        ${className ?? ""}
      `}
    >
      {children}
    </button>
  )
}