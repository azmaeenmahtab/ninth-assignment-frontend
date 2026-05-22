import React from 'react'
import Image from 'next/image'
import storyDog from '@/assets/482a1afb3c3e80aae632fd68ce2af3d0.jpg'
import storyCat from '@/assets/f2af45e0719927735c0f3d3dc840bf37.jpg'

const SuccessStory = () => {
	return (
		<section className="max-w-6xl mx-auto mt-12">
			<div className="text-center">
				<h2 className="text-2xl md:text-3xl font-semibold text-[#651028]">
					Heartwarming Success Stories
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					See how these furry friends transformed the lives of their new families.
				</p>
			</div>

			<div className="mt-8 grid gap-6 md:grid-cols-2">
				<div className="rounded-3xl bg-white p-6 shadow-sm">
					<div className="flex items-center gap-5">
						<div className="h-20 w-20 overflow-hidden rounded-2xl">
							<Image
								src={storyDog}
								alt="Charlie the dog"
								width={80}
								height={80}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-1 text-[#651028]">
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
							</div>
							<p className="mt-2 text-sm text-gray-600 italic">
								&quot;Adopting Charlie was the best decision we ever made. He brought so much
								life back into our home. PawPals made the process seamless.&quot;
							</p>
							<p className="mt-3 text-sm font-semibold text-[#651028]">— The Miller Family</p>
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-white p-6 shadow-sm">
					<div className="flex items-center gap-5">
						<div className="h-20 w-20 overflow-hidden rounded-2xl">
							<Image
								src={storyCat}
								alt="Bella the cat"
								width={80}
								height={80}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-1 text-[#651028]">
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
							</div>
							<p className="mt-2 text-sm text-gray-600 italic">
								&quot;I was nervous about adoption, but finding Bella on PawPals was like
								destiny. She is my perfect work-from-home buddy.&quot;
							</p>
							<p className="mt-3 text-sm font-semibold text-[#651028]">— Sarah J.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SuccessStory
