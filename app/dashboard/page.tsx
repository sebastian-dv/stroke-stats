"use client"

import { createAuthClient } from "better-auth/react"
import Button from "@/components/Button"

const { signOut } = createAuthClient()

export default function Page() {
    return (
        <div>
            <h1>hello dashboard</h1>
            <Button onClick={() => signOut({fetchOptions: { onSuccess: () => { window.location.href = "/login" } }})}>
                Sign Out
            </Button>
        </div>
    )
}