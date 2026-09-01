"use client"

import { signOut } from "@/lib/auth-client"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter();
    return (
        <div>
            <h1>hello dashboard</h1>
            <Button onClick={() => signOut({
                fetchOptions: { onSuccess: () => router.push("/login") }
            })}>
                Sign Out
            </Button>
        </div>
    )
}