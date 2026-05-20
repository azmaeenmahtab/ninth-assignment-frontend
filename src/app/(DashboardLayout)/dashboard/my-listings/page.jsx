"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'

const MyListingsPage = () => {
  const { data: session } = useSession()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    const loadListings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/get-listing?userId=${userId}`)
        const data = await res.json()
        setListings(data?.listings || [])
      } catch (error) {
        setListings([])
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [session?.user?.id])

  const stats = useMemo(() => {
    const total = listings.length
    const adopted = listings.filter((pet) => pet?.adoptionStatus === 'adopted').length
    const pending = listings.filter((pet) => pet?.adoptionStatus === 'pending').length
    const available = total - adopted - pending
    return { total, available, adopted, pending }
  }, [listings])

  return (
    <div className="min-h-screen bg-[#f3e8d5] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] uppercase text-gray-400">Total Listings</p>
            <p className="text-2xl font-semibold text-[#651028]">{stats.total}</p>
          </div>
          <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] uppercase text-gray-400">Available</p>
            <p className="text-2xl font-semibold text-[#651028]">{stats.available}</p>
          </div>
          <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] uppercase text-gray-400">Adopted</p>
            <p className="text-2xl font-semibold text-[#651028]">{stats.adopted}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-[320px] rounded-2xl bg-black/10 animate-pulse" />
            ))
          )}

          {!loading && listings.map((pet) => {
            const status = (pet?.adoptionStatus || 'available').toLowerCase()
            const statusLabel = status === 'adopted' ? 'ADOPTED' : status === 'pending' ? 'PENDING' : 'AVAILABLE'
            return (
              <div key={pet?._id} className="rounded-2xl bg-white shadow-sm">
                <div className="relative">
                  <img
                    src={pet?.imageSrc}
                    alt={pet?.petName || 'Pet'}
                    className="h-44 w-full rounded-t-2xl object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#651028] px-3 py-1 text-[10px] font-semibold text-white">
                    {statusLabel}
                  </span>
                  <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[#651028]">
                    ${pet?.adoptionFee || '0'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#3b2f2f]">{pet?.petName || 'Unnamed'}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {pet?.breed || 'Mixed Breed'} · {pet?.age || 'N/A'}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="rounded-full border border-gray-200 px-3 py-2 text-[11px] font-semibold text-[#651028]">Requests</button>
                    <button className="rounded-full border border-gray-200 px-3 py-2 text-[11px] font-semibold text-[#651028]">View</button>
                    <button className="rounded-full bg-[#651028] px-3 py-2 text-[11px] font-semibold text-white">Edit</button>
                    <button className="rounded-full border border-[#651028] px-3 py-2 text-[11px] font-semibold text-[#651028]">Delete</button>
                  </div>
                </div>
              </div>
            )
          })}

          {!loading && (
            <Link
              href="/dashboard/add-pet"
              className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8c5a5] bg-[#f7efdf] text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8c5a5] text-xl text-[#651028]">+</span>
              <p className="mt-4 text-sm font-semibold text-[#651028]">Post New Pet</p>
              <p className="mt-1 text-xs text-gray-500">Find another companion a forever home</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyListingsPage
