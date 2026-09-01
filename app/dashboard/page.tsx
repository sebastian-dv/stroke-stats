"use client"

import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Button from "@/components/Button"
import Image from "next/image"

export default function Page() {
    const { data: session, isPending } = useSession()
    const router = useRouter()

    if (isPending) return <div>Loading...</div>

    return (
        <div>
            <h1>Welcome {session?.user?.name}</h1>
            <Image 
                src={session?.user?.image ?? "/default-pfp.jpg"} 
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
            />
            <Button onClick={() => signOut({
                fetchOptions: { onSuccess: () => router.push("/login") }
            })}>
                Sign Out
            </Button>
        </div>
    )
}