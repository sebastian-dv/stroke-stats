import Navbar from "@/components/Navbar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-rough"
      style={{
        background: "linear-gradient(to right, var(--color-rough) 0%, var(--color-fairway) 20%, var(--color-fairway) 80%, var(--color-rough) 100%)"
      }}
    >
      <Navbar />
      {children}
    </div>
  )
}