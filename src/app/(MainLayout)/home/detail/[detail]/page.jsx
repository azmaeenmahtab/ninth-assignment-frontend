/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth-client'

const PetDetailPage = () => {
	const { detail } = useParams()
	const router = useRouter()
	const { data: session } = useSession()
	const [pet, setPet] = useState(null)
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)

	useEffect(() => {
		if (!detail) return

		const loadPet = async () => {
			try {
				const res = await fetch(`http://localhost:5000/pet-detail?petId=${detail}`)
				const data = await res.json()
				setPet(data?.pet || null)
			} catch (error) {
				setPet(null)
			} finally {
				setLoading(false)
			}
		}

		loadPet()
	}, [detail])

	const handleRequest = async (e) => {
		e.preventDefault()
		if (!pet?._id) return

		const userId = session?.user?.id
		const ownerId = pet?.userId
		if (!userId) {
			showErrorToast('Please log in to request adoption.')
			return
		}

		if (ownerId && userId === ownerId) {
			showErrorToast('Owner cannot request for adoption.')
			return
		}

		const formData = new FormData(e.currentTarget)
		const payload = {
			petId: pet?._id,
			petName: pet?.petName || '',
			petImageSrc: pet?.imageSrc || '',
			userId,
			ownerId: ownerId || '',
			userName: session?.user?.name || '',
			userEmail: session?.user?.email || '',
			pickupDate: formData.get('pickupDate') || '',
			message: formData.get('message') || ''
		}

		try {
			setSubmitting(true)
			const token = await authClient.token()
			const tokenValue = token?.data?.token || ''
			if (!tokenValue) {
				console.warn('auth token missing')
			}
			console.log('auth token:', tokenValue)
			const res = await fetch('http://localhost:5000/request-adoption', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${tokenValue}`
				},
				body: JSON.stringify(payload)
			})
			const data = await res.json()
			if (!res.ok) {
				showErrorToast(data?.message || 'Failed to submit request.')
				return
			}
			showSuccessToast('Adoption request submitted.')
			router.push('/dashboard/my-requests')
		} catch (error) {
			showErrorToast('Error submitting request.')
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-white px-6 py-10">
				<div className="mx-auto flex h-[520px] max-w-6xl items-center justify-center rounded-3xl bg-white">
					<Spinner size="lg" />
				</div>
			</div>
		)
	}

	if (!pet) {
		return (
			<div className="min-h-screen bg-[#f2e4d1] px-6 py-10">
				<div className="mx-auto max-w-3xl rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f7e6e9] text-2xl">🐾</div>
					<h1 className="mt-6 text-2xl font-semibold text-[#651028]">Pet not found</h1>
					<p className="mt-3 text-sm text-gray-600">
						This pet listing might have been removed or is no longer available.
					</p>
					<Link
						href="/dashboard/my-listings"
						className="mt-6 inline-flex rounded-full bg-[#651028] px-6 py-2 text-sm font-semibold text-white"
					>
						Back to My Listings
					</Link>
				</div>
			</div>
		)
	}

	return (
		<>
		<div className="min-h-screen bg-[#f2e4d1] px-6 py-10 max-w-7xl mx-auto rounded-2xl">
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
					{/* Left: Pet showcase */}
					<div>
						<div className="overflow-hidden rounded-[36px] bg-[#651028] p-6">
							<div className="relative overflow-hidden rounded-[28px] bg-white">
								<img
									src={pet?.imageSrc}
									alt={pet?.petName || 'Pet'}
									className="h-90 w-full object-cover"
								/>
								<span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[#651028]">
									Available
								</span>
							</div>
							<div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-white px-4 py-3 text-center">
								<div>
									<p className="text-[10px] uppercase text-gray-400">Age</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.age || 'N/A'}</p>
								</div>
								<div>
									<p className="text-[10px] uppercase text-gray-400">Weight</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.weight || 'N/A'}</p>
								</div>
								<div>
									<p className="text-[10px] uppercase text-gray-400">Gender</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.gender || 'N/A'}</p>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<div className="flex flex-wrap items-center gap-3">
								<h1 className="text-2xl font-semibold text-[#3b2f2f]">{pet?.petName || 'Pet'}</h1>
								<span className="rounded-full bg-[#f1d7da] px-3 py-1 text-[10px] font-semibold text-[#651028]">
									Available for Adoption
								</span>
							</div>

							<div className="mt-3 grid gap-3 sm:grid-cols-2">
								<div className="rounded-xl bg-white px-4 py-3 shadow-sm">
									<p className="text-xs text-gray-400">Breed</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.breed || 'Mixed Breed'}</p>
								</div>
								<div className="rounded-xl bg-white px-4 py-3 shadow-sm">
									<p className="text-xs text-gray-400">Personality</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.personality || 'Joyful & Energetic'}</p>
								</div>
								<div className="rounded-xl bg-white px-4 py-3 shadow-sm">
									<p className="text-xs text-gray-400">Color</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.color || 'Fawn & White'}</p>
								</div>
								<div className="rounded-xl bg-white px-4 py-3 shadow-sm">
									<p className="text-xs text-gray-400">Health Status</p>
									<p className="text-sm font-semibold text-[#3b2f2f]">{pet?.healthStatus || 'Vaccinated & Microchipped'}</p>
								</div>
							</div>

							<div className="mt-6">
								<h2 className="text-lg font-semibold text-[#3b2f2f]">About {pet?.petName || 'this pet'}</h2>
								<p className="mt-2 text-sm text-gray-600">
									{pet?.description || 'No description available.'}
								</p>
							</div>
						</div>
					</div>

					{/* Right: Adoption form */}
					<div>
						<div className="rounded-3xl bg-white p-6 shadow-sm">
							<h2 className="text-xl font-semibold text-[#651028] text-center">Adopt {pet?.petName || 'this pet'}</h2>
							<p className="mt-1 text-center text-xs text-gray-500">Begin your journey with your new best friend.</p>

							<form className="mt-6 space-y-4" onSubmit={handleRequest}>
								<div className="grid grid-cols-2 gap-3">
									<div>
										<label className="text-xs font-semibold text-gray-500">Pet Name</label>
										<input
											type="text"
											value={pet?.petName || ''}
											readOnly
											className="mt-1 w-full rounded-lg bg-[#f4f6ff] px-3 py-2 text-xs text-[#3b2f2f] outline-none"
										/>
									</div>
									<div>
										<label className="text-xs font-semibold text-gray-500">Applicant</label>
										<input
											type="text"
											value={session?.user?.name || ''}
											readOnly
											className="mt-1 w-full rounded-lg bg-[#f4f6ff] px-3 py-2 text-xs text-[#3b2f2f] outline-none"
										/>
									</div>
								</div>

								<div>
									<label className="text-xs font-semibold text-gray-500">Your Email</label>
									<input
										type="email"
										value={session?.user?.email || ''}
										readOnly
										className="mt-1 w-full rounded-lg bg-[#f4f6ff] px-3 py-2 text-xs text-[#3b2f2f] outline-none"
									/>
								</div>

								<div>
									<label className="text-xs font-semibold text-gray-500">Desired Pickup Date</label>
									<input
										type="date"
										name="pickupDate"
										className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#651028]"
									/>
								</div>

								<div>
									<label className="text-xs font-semibold text-gray-500">Why do you want to adopt {pet?.petName || 'this pet'}?</label>
									<textarea
										rows={4}
										name="message"
										placeholder="Tell us about your home and why you'd be a great fit..."
										className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#651028]"
									/>
								</div>

								<button
									type="submit"
									className="mt-2 w-full rounded-full bg-[#651028] py-2 text-xs font-semibold text-white"
									disabled={submitting}
								>
									{submitting ? 'Submitting...' : 'Submit Adoption Request'}
								</button>
							</form>

							{/* <div className="mt-4 rounded-xl bg-[#f7f3ff] px-3 py-3 text-[10px] text-gray-600">
								Your application is secure and will be reviewed by our team within 24 hours.
							</div>
							<div className="mt-3 rounded-xl bg-[#f7f7f7] px-3 py-3 text-[10px] text-gray-600">
								Need help with the process? Contact our adoption counselor at (555) 123-PAWS.
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
		<ToastContainer />
		</>
	)
}

export default PetDetailPage
