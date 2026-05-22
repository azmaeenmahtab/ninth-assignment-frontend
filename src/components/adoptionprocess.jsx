
import React from 'react';

const steps = [
	{
		icon: (
			<svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#651028" opacity=".12"/><path d="M11 17a1 1 0 0 1-1-1v-1.382a1 1 0 0 1 .293-.707l4.414-4.414a2 2 0 1 0-2.828-2.828l-4.414 4.414A1 1 0 0 1 7 13.618V15a1 1 0 0 1-1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 1 1h2a1 1 0 0 1 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1-1-1v-1.382a1 1 0 0 1-.293-.707l-4.414-4.414a2 2 0 1 0-2.828 2.828l4.414 4.414A1 1 0 0 1 13 17v2a1 1 0 0 1-1 1h-2z" fill="#651028"/></svg>
		),
		title: '1. Browse & Match',
		desc: 'Explore our curated gallery of pets or take our lifestyle quiz to find your perfect match.'
	},
	{
		icon: (
			<svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#651028" opacity=".12"/><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#651028"/></svg>
		),
		title: '2. Meet & Greet',
		desc: 'Schedule a virtual or in-person meeting with your potential new companion to see if you click.'
	},
	{
		icon: (
			<svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#651028" opacity=".12"/><path d="M12 7a5 5 0 0 1 5 5v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3a5 5 0 0 1 5-5z" fill="#651028"/></svg>
		),
		title: '3. Welcome Home',
		desc: 'Complete the safe vetting process and welcome your new loyal friend to their forever home.'
	}
];

const AdoptionProcess = () => (
	<section className="bg-[#f3e8d5] py-10 max-w-7xl mx-auto rounded-2xl">
		<div className="max-w-6xl mx-auto text-center">
			<h2 className="text-2xl md:text-3xl font-semibold text-[#651028] mb-2">How the Adoption Process Works</h2>
			<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
				Finding your new best friend is easy and rewarding. Follow these simple steps to bring joy home.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{steps.map((step, idx) => (
					<div key={idx} className="rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center">
						<div className="mb-4">{step.icon}</div>
						<h3 className="text-lg font-semibold text-[#651028] mb-2">{step.title}</h3>
						<p className="text-gray-600 text-sm">{step.desc}</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default AdoptionProcess;
