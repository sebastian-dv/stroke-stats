"use client"

import { createAuthClient } from "better-auth/react";
import Button from "@/components/Button"
const authClient = createAuthClient();

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-green-900">
			<section className="flex flex-col items-center border rounded-2xl w-full max-w-sm mx-4 p-8 bg-amber-50">
				<h1 className="text-3xl font-bold text-green-950 mb-2">Stroke Stats</h1>
				<Button 
					onClick={() => authClient.signIn.social({provider: "google", callbackURL: "/dashboard"})}
				>
					Login With Google 
				</Button>
			</section>
		</div>
	);
}
