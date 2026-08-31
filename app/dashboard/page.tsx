"use client"

import { createAuthClient } from "better-auth/react"

const { signOut } = createAuthClient()

export default function Page() {
    return (
        <div>
            <h1>hello dashboard</h1>
            <button onClick={() => signOut({fetchOptions: { onSuccess: () => { window.location.href = "/login" } }})}>
                Sign Out
            </button>
        </div>
    )
}