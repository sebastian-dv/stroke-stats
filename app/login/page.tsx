"use client"

import { signIn } from "@/lib/auth-client";
import Button from "@/components/Button"

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-rough">
			<section className="flex flex-col items-center border rounded-2xl w-full max-w-sm mx-4 p-8 bg-card">
				<h1 className="text-3xl font-bold text-text-dark mb-2">Stroke Stats</h1>
				<Button 
					onClick={() => signIn.social({provider: "google", callbackURL: "/dashboard"})}
				>
					Login With Google 
				</Button>
			</section>
		</div>
	);
}
