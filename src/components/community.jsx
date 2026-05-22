import React from 'react'

const Community = () => {
	return (
		<section className="max-w-6xl mx-auto mt-12 space-y-6">
			<div className="rounded-3xl bg-[#651028] px-6 py-10 text-center text-white shadow-sm">
				<h2 className="text-2xl md:text-3xl font-semibold">Join Our Community</h2>
				<p className="mt-2 text-sm text-white/80">
					Whether you&apos;re looking to volunteer your time, donate, or just stay updated with
					heartwarming stories, there&apos;s a place for you in the PawPals family.
				</p>

				<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<div className="flex w-full max-w-xs items-center rounded-full bg-white/10 px-3 py-2">
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full bg-transparent text-sm text-white placeholder:text-white/60 outline-none"
						/>
					</div>
					<button
						type="button"
						className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#651028]"
					>
						Join Now
					</button>
					<span className="text-xs text-white/80">OR</span>
					<button
						type="button"
						className="rounded-full border border-white/70 px-6 py-2 text-sm font-semibold text-white"
					>
						Become a Volunteer
					</button>
				</div>
			</div>

			<div className="rounded-3xl bg-[#651028] px-6 py-10 text-center text-white shadow-sm">
				<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
					<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
						<path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" />
					</svg>
				</div>
				<h3 className="mt-4 text-xl font-semibold">Safe & Secure Adoptions</h3>
				<p className="mt-2 text-sm text-white/80">
					Every pet listed on PawPals goes through a rigorous vetting process. We ensure
					health checks, behavioral assessments, and reliable foster background info.
				</p>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-white/90">
					<div className="flex items-center gap-2">
						<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">✔</span>
						Vet Verified
					</div>
					<div className="flex items-center gap-2">
						<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">✔</span>
						Identity Confirmed
					</div>
					<div className="flex items-center gap-2">
						<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">✔</span>
						24/7 Support
					</div>
				</div>
			</div>
		</section>
	)
}

export default Community
