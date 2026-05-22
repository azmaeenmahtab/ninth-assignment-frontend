/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'

const LoadingCard = () => {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

const Allpetpage = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [species, setSpecies] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  const loadPets = async (options = {}) => {
    const params = new URLSearchParams()

    if (options.search?.trim()) {
      params.set('search', options.search.trim())
    }

    if (options.species?.trim()) {
      params.set('species', options.species.trim())
    }

    const url = params.toString()
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/all-pets?${params.toString()}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/all-pets`

    try {
      setHasError(false)
      const res = await fetch(url)
      const data = await res.json()
      const fetchedPets = data?.pets || []

      if (options.sort === 'fee_asc' || options.sort === 'fee_desc') {
        const direction = options.sort === 'fee_asc' ? 1 : -1
        const sortedPets = [...fetchedPets].sort((a, b) => {
          const aFee = Number(a?.adoptionFee ?? 0)
          const bFee = Number(b?.adoptionFee ?? 0)

          if (Number.isNaN(aFee) && Number.isNaN(bFee)) return 0
          if (Number.isNaN(aFee)) return 1
          if (Number.isNaN(bFee)) return -1

          return (aFee - bFee) * direction
        })
        setPets(sortedPets)
      } else {
        setPets(fetchedPets)
      }
    } catch (error) {
      setHasError(true)
      setPets([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPets()
  }, [])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#651028]">Find Your New Best Friend</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse our community of loving pets waiting for their forever homes. Every
          companion here is looking for a place to call home.
        </p>
      </div>

      <div className="mb-10 rounded-2xl border border-[#f3e8d5] bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]">
          <div>
            <label className="text-xs font-semibold text-[#6b5a44]">Search by name</label>
            <input
              type="text"
              placeholder="Buddy, Mittens..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#651028]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6b5a44]">Species</label>
            <input
              type="text"
              placeholder="Dog, Cat, Bird..."
              value={species}
              onChange={(event) => setSpecies(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#651028]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6b5a44]">Sort by fee</label>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#651028]"
            >
              <option value="">Default</option>
              <option value="fee_asc">Fee: Low to High</option>
              <option value="fee_desc">Fee: High to Low</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="w-full rounded-full bg-[#651028] px-6 py-3 text-sm font-semibold text-white"
              onClick={() => {
                setLoading(true)
                loadPets({ search: searchTerm, species, sort: sortOrder })
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {loading && <LoadingCard />}

      {!loading && hasError && (
        <p className="text-sm text-red-600">Unable to load pets. Please try again.</p>
      )}

      {!loading && !hasError && pets.length === 0 && (
        <p className="text-sm text-gray-600">No pets found.</p>
      )}

      {!loading && !hasError && pets.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  href={`/home/detail/${pet?._id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#651028] py-2 text-xs font-semibold text-white"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Allpetpage
