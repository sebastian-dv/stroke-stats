"use client"

import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Page() {
    const { data: session, isPending } = useSession()
    const router = useRouter()

    if (isPending) return (
        <div className="flex items-center justify-center min-h-screen bg-rough">
            <p className="text-white text-2xl font-bold">Loading...</p>
        </div>
    )

    return (
    <div
      className="min-h-screen bg-rough"
      style={{
        background: "linear-gradient(to right, var(--color-rough) 0%, var(--color-fairway) 20%, var(--color-fairway) 80%, var(--color-rough) 100%)"
      }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Stat card */}
        <section className="bg-card rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={session?.user?.image ?? "/default-pfp.jpg"}
              alt="profile picture"
              width={56}
              height={56}
              className="rounded-full ring-2 ring-text-muted"
            />
            <div>
              <h1 className="text-xl font-bold text-text-dark">{session?.user?.name}</h1>
              <p className="text-sm text-text-muted">{session?.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/login") } })}
              className="ml-auto text-sm text-text-muted hover:text-text-dark hover:cursor-pointer transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* Placeholder stats */}
          <article className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-dark">—</p>
              <p className="text-xs text-text-muted">Handicap</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-dark">—</p>
              <p className="text-xs text-text-muted">Rounds</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-dark">—</p>
              <p className="text-xs text-text-muted">Avg Score</p>
            </div>
          </article>
        </section>

        {/* Recent rounds placeholder */}
        <div className="bg-card rounded-2xl shadow-2xl p-6">
          <h2 className="text-lg font-bold text-text-dark mb-4">Recent Rounds</h2>
          <p className="text-sm text-text-muted">No rounds logged yet.</p>
        </div>

      </div>
    </div>
  )
}