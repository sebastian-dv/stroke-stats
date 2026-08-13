"use client"

import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export default function Page() {
	return (
		<>
			<h1>Hello login!</h1>
			<button onClick={() => authClient.signIn.social({provider: "google",})}>
				Login With Google 
			</button>
		</>
	);
}
