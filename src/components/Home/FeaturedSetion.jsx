"use client";

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'

const LoadingCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="h-[320px] rounded-2xl bg-black/90 animate-pulse"
        />
      ))}
    </div>
  )
}

const FeaturedContent = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPets = async () => {
      try {
        const res = await fetch('http://localhost:5000/all-pets')
        const data = await res.json()
        setPets((data?.pets || []).slice(0, 6))
      } catch (error) {
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    loadPets()
  }, [])

  if (loading) {
    return <LoadingCard />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <div key={pet?._id} className="rounded-2xl bg-white shadow-sm">
          <div className="h-48 w-full overflow-hidden rounded-t-2xl">
            <img
              src={pet?.imageSrc}
              alt={pet?.petName || 'Pet'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#3b2f2f]">
                {pet?.petName || 'Unnamed'}
              </h3>
              <span className="text-sm font-semibold text-[#651028]">
                Fee: ${pet?.adoptionFee || '0'}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {pet?.breed || 'Mixed Breed'}
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-[#f3e8d5] px-3 py-1 text-[10px] font-semibold text-[#6b5a44]">
                Age: {(pet?.age || 'N/A').toString().toUpperCase()}
              </span>
              <span className="rounded-full bg-[#f3e8d5] px-3 py-1 text-[10px] font-semibold text-[#6b5a44]">
                {(pet?.gender || 'N/A').toString().toUpperCase()}
              </span>
            </div>
            <Link
              href={`/home/${pet?._id}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#651028] py-2 text-xs font-semibold text-white"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const FeaturedSetion = () => {
  return (
    <div>

    <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-[#651028]">Featured Pets</h2>
          <p className="mt-2 text-sm text-gray-600">
            Find your next best friend from our handpicked listings.
          </p>
        </div>
    <section className="bg-[#f3e8d5] px-6 py-10 max-w-7xl mx-auto rounded-2xl">
      <div className="mx-auto max-w-6xl">
        

        <Suspense fallback={<LoadingCard />}>
          <FeaturedContent />
        </Suspense>
      </div>
    </section>
    </div>
  )
}

export default FeaturedSetion
