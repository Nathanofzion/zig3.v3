"use client";

import { Button } from "@tremor/react";
import Link from "next/link";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold">
					{error.name}
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Something went wrong
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Error: {error.message}
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/"
						className="text-sm font-semibold leading-7"
					>
						<span aria-hidden="true">&larr;</span> Back to home
					</Link>

					<Button
						onClick={() => reset()}
					>
						Try again
					</Button>
				</div>
			</div>
		</main>
	);
}
