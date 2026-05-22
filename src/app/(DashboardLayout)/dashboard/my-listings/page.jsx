"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { useRequestsModal } from '@/lib/contexts/requestsmodalcontext'
import { useDeleteConfirmModal } from '@/lib/contexts/deleteconfirmmodalcontext'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth-client'

const MyListingsPage = () => {
  const { data: session } = useSession()
  const { openModal } = useRequestsModal()
  const { openDeleteModal } = useDeleteConfirmModal()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    const loadListings = async () => {
      try {
        const token = await authClient.token()
        const tokenValue = token?.data?.token || ''
        if (!tokenValue) {
          console.warn('auth token missing')
        }
        console.log('auth token:', tokenValue)
        const res = await fetch(`http://localhost:5000/get-listing?userId=${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenValue}`
          }
        })
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

  const handleDelete = (pet) => {
    if (!pet?._id) return
    openDeleteModal({
      title: 'Delete listing',
      message: `Are you sure you want to delete ${pet?.petName || 'this listing'}? This action cannot be undone.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      onConfirm: async () => {
        const token = await authClient.token()
        const tokenValue = token?.data?.token || ''
        if (!tokenValue) {
          console.warn('auth token missing')
        }
        console.log('auth token:', tokenValue)
        const res = await fetch(`http://localhost:5000/delete-listing?petId=${pet._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenValue}`
          }
        })
        if (!res.ok) {
          return
        }
        setListings((prev) => prev.filter((item) => item?._id !== pet._id))
      }
    })
  }

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
            <div className="col-span-full flex min-h-[320px] items-center justify-center">
              <Spinner size="lg" />
            </div>
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
                    <button
                      type="button"
                      onClick={() => openModal(pet?._id, pet?.petName)}
                      className="rounded-full border border-gray-200 px-3 py-2 text-[11px] font-semibold text-[#651028]"
                    >
                      Requests
                    </button>
                    <Link
                      href={`/home/detail/${pet?._id}`}
                      className="rounded-full border border-gray-200 px-3 py-2 text-center text-[11px] font-semibold text-[#651028]"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/update-pet/${pet?._id}`}
                      className="rounded-full bg-[#651028] px-3 py-2 text-center text-[11px] font-semibold text-white"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(pet)}
                      className="rounded-full border border-[#651028] px-3 py-2 text-[11px] font-semibold text-[#651028]"
                    >
                      Delete
                    </button>
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
