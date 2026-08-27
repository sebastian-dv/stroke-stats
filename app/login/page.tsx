"use client"

import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-green-900">
			<section className="flex flex-col items-center border rounded-2xl w-full max-w-sm mx-4 p-8 bg-amber-50">
				<h1 className="text-3xl font-bold text-green-950 mb-2">Stroke Stats</h1>
				<button 
					onClick={() => authClient.signIn.social({provider: "google",})}
					className="w-full bg-green-800 hover:bg-green-700 hover:cursor-pointer text-white font-semibold py-3 rounded-xl transition-colors"
				>
					Login With Google 
				</button>
			</section>
		</div>
	);
}
