import React from 'react'
import Image from 'next/image'
import nutritionImage from '@/assets/dogbannerpic.png'
import trainingImage from '@/assets/maroonbg.jpg'
import healthImage from '@/assets/signuppagebanner.png'
import groomingImage from '@/assets/482a1afb3c3e80aae632fd68ce2af3d0.jpg'

const tips = [
	{
		title: 'Nutrition 101',
		description: "Choosing the right diet for your pet's age and activity level.",
		image: nutritionImage,
		alt: 'Nutrition tips'
	},
	{
		title: 'Training Basics',
		description: 'Essential commands and positive reinforcement techniques.',
		image: trainingImage,
		alt: 'Training basics'
	},
	{
		title: 'Health Checks',
		description: "Regular vet visits and preventative care you shouldn't skip.",
		image: healthImage,
		alt: 'Health checks'
	},
	{
		title: 'Grooming Tips',
		description: 'Keep your pet looking and feeling their best with easy grooming.',
		image: groomingImage,
		alt: 'Grooming tips'
	}
]

const PetOwnerTips = () => {
	return (
		<section className="max-w-6xl mx-auto mt-12">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl md:text-3xl font-semibold text-[#651028]">New Pet Owner Tips</h2>
					<p className="mt-2 text-sm text-gray-600">
						Expert advice to help you and your new pet adjust to life together.
					</p>
				</div>
				<button type="button" className="text-sm font-semibold text-[#651028]">
					Read More Tips
				</button>
			</div>

			<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{tips.map((tip) => (
					<div key={tip.title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
						<div className="relative h-36">
							<Image
								src={tip.image}
								alt={tip.alt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 25vw"
							/>
						</div>
						<div className="px-4 py-5">
							<h3 className="text-sm font-semibold text-[#651028]">{tip.title}</h3>
							<p className="mt-2 text-xs text-gray-600">{tip.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default PetOwnerTips
