"use client"

import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export default function Page() {
	return (
		<div className="flex">
			<section className="flex flex-col">
				<h1>StrokeStats</h1>
				<article className="border rounded-md p-2">
					<button onClick={() => authClient.signIn.social({provider: "google",})}>
						Login With Google 
					</button>
				</article>
			</section>
		</div>
	);
}
