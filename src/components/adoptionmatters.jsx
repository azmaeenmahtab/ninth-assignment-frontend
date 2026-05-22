import React from 'react'
import Image from 'next/image'
import adoptionMattersDog from '@/assets/adoptionmattersdogpic.avif'

const AdoptionMatters = () => {
	return (
		<section className="max-w-6xl mx-auto mt-12">
			<div className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-[1.05fr_1fr]">
				<div className="relative min-h-[240px] md:min-h-[360px]">
					<Image
						src={adoptionMattersDog}
						alt="Happy dog"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 50vw"
						priority
					/>
				</div>

				<div className="px-6 py-8 md:px-10 md:py-10">
					<h2 className="text-2xl font-semibold text-[#651028]">Why Adoption Matters</h2>

					<div className="mt-6 space-y-5">
						<div className="flex items-start gap-3">
							<span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#651028]/10 text-[#651028]">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
									<path d="M12 21s-6.7-4.35-9.33-8.2C.6 9.76 2.2 6 6 6c2.02 0 3.25 1.17 4 2.2C10.75 7.17 11.98 6 14 6c3.8 0 5.4 3.76 3.33 6.8C18.7 16.65 12 21 12 21z" />
								</svg>
							</span>
							<div>
								<h3 className="text-sm font-semibold text-[#3b2f2f]">Save a Life</h3>
								<p className="mt-1 text-sm text-gray-600">
									Every year, millions of pets wait in shelters for a home. By adopting,
									you&apos;re giving a second chance to a loving animal.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#651028]/10 text-[#651028]">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
									<path d="M16 11a4 4 0 1 0-3.9-5H12a4 4 0 0 0-3.9 5H8a3 3 0 0 0-3 3v4h6v-2h2v2h6v-4a3 3 0 0 0-3-3h-0.1z" />
								</svg>
							</span>
							<div>
								<h3 className="text-sm font-semibold text-[#3b2f2f]">Find a Loyal Companion</h3>
								<p className="mt-1 text-sm text-gray-600">
									Shelter pets are often already socialized and incredibly grateful for a
									new home, making them wonderful companions.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#651028]/10 text-[#651028]">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
									<path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" />
								</svg>
							</span>
							<div>
								<h3 className="text-sm font-semibold text-[#3b2f2f]">Healthier Communities</h3>
								<p className="mt-1 text-sm text-gray-600">
									Responsible adoption helps control pet overpopulation and supports
									shelters in their mission to care for animals.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdoptionMatters
