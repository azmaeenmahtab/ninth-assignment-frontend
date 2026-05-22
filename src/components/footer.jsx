import React from 'react'

const Footer = () => {
	return (
		<footer className="border-t border-[#f3e8d5] bg-white">
			<div className="mx-auto max-w-7xl px-6 py-10">
				<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
					<div>
						<div className="flex items-center gap-2 text-sm font-semibold text-[#651028]">
							<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#651028]/10">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
									<path d="M12 3c2.2 0 4 1.8 4 4 0 3-4 7-4 7s-4-4-4-7c0-2.2 1.8-4 4-4zm7 12.5c0-1.1-2.4-2-5.5-2s-5.5.9-5.5 2 2.4 2 5.5 2 5.5-.9 5.5-2z" />
								</svg>
							</span>
							PawPals
						</div>
						<p className="mt-3 text-xs text-gray-600">
							Connecting lovable pets with their forever families. Making the world a
							better place, one adoption at a time.
						</p>
						<div className="mt-4 flex items-center gap-3">
							<a
								href="#"
								className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#651028]"
								aria-label="Instagram"
							>
								<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
									<path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
								</svg>
							</a>
							<a
								href="#"
								className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#651028]"
								aria-label="Facebook"
							>
								<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
									<path d="M14 8h2V6h-2c-2.2 0-4 1.8-4 4v2H8v2h2v6h2v-6h2l1-2h-3v-2c0-1.1.9-2 2-2z" />
								</svg>
							</a>
							<a
								href="#"
								className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#651028]"
								aria-label="YouTube"
							>
								<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
									<path d="M21.8 8.1a2.7 2.7 0 0 0-1.9-1.9C18.3 6 12 6 12 6s-6.3 0-7.9.2A2.7 2.7 0 0 0 2.2 8.1 28.3 28.3 0 0 0 2 12a28.3 28.3 0 0 0 .2 3.9 2.7 2.7 0 0 0 1.9 1.9c1.6.2 7.9.2 7.9.2s6.3 0 7.9-.2a2.7 2.7 0 0 0 1.9-1.9A28.3 28.3 0 0 0 22 12a28.3 28.3 0 0 0-.2-3.9zM10 15.5v-7l6 3.5-6 3.5z" />
								</svg>
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-xs font-semibold text-[#651028]">QUICK LINKS</h3>
						<ul className="mt-3 space-y-2 text-xs text-gray-600">
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Terms of Service</a></li>
							<li><a href="#">Help Center</a></li>
						</ul>
					</div>

					<div>
						<h3 className="text-xs font-semibold text-[#651028]">CONTACT US</h3>
						<ul className="mt-3 space-y-2 text-xs text-gray-600">
							<li>support@pawpals.com</li>
							<li>(555) 123-4567</li>
						</ul>
						<div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#651028]/10 px-3 py-2 text-[10px] font-semibold text-[#651028]">
							PawPals Trust &amp; Safety Verified
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#f3e8d5] pt-4 text-[10px] text-gray-500">
					<span>© 2024 PawPals. All paws reserved.</span>
					<span>Made with ♥ for furry friends</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
