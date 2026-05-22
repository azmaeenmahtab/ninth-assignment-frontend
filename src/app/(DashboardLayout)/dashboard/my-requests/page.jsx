"use client";

import React, { useEffect, useMemo, useState } from 'react'
import { useSession } from "@/lib/auth-client"
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth-client'

const RequestsPage = () => {
  const { data: session } = useSession()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    const fetchRequests = async () => {
      try {
        setLoading(true)
        const token = await authClient.token()
        const tokenValue = token?.data?.token || ''
        if (!tokenValue) {
          console.warn('auth token missing')
        }
        console.log('auth token:', tokenValue)
        const res = await fetch(`http://localhost:5000/my-adoption-requests?userId=${userId}`, {
          headers: {
            authorization: `Bearer ${tokenValue}`
          }
        })
        const data = await res.json()
        setRequests(data?.requests || [])
      } catch (error) {
        setRequests([])
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [session?.user?.id])

  const handleCancel = async (petId) => {
    const userId = session?.user?.id
    if (!userId || !petId) return

    try {
      const token = await authClient.token()
      const tokenValue = token?.data?.token || ''
      if (!tokenValue) {
        console.warn('auth token missing')
      }
      console.log('auth token:', tokenValue)
      const res = await fetch(`http://localhost:5000/request-adoption?petId=${petId}&userId=${userId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${tokenValue}`
        }
      })
      if (res.ok) {
        setRequests((prev) => prev.filter((req) => req.petId !== petId))
      }
    } catch (error) {
      // no-op for now
    }
  }

  const formatDate = (value) => {
    if (!value) return 'N/A'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const stats = useMemo(() => {
    const pending = requests.filter((req) => (req?.status || 'pending').toLowerCase() === 'pending').length
    const approved = requests.filter((req) => (req?.status || '').toLowerCase() === 'approved').length
    const rejected = requests.filter((req) => (req?.status || '').toLowerCase() === 'rejected').length
    return { pending, approved, rejected }
  }, [requests])

  return (
    <div className="min-h-screen bg-[#f3e8d5] px-6">

      {requests.length > 0 && (
        <div className="">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <p className="text-[10px] uppercase text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-[#651028]">{stats.pending}</p>
            </div>
            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <p className="text-[10px] uppercase text-gray-400">Approved</p>
              <p className="text-2xl font-semibold text-[#651028]">{stats.approved}</p>
            </div>
            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <p className="text-[10px] uppercase text-gray-400">Rejected</p>
              <p className="text-2xl font-semibold text-[#651028]">{stats.rejected}</p>
            </div>
          </div>
        </div>
      )}
 
      {loading && (
        <div className="mt-10 flex justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e8d5] text-2xl">🐾</div>
            <h2 className="text-base font-semibold text-[#651028]">No Requests Found</h2>
            <p className="mt-2 text-xs text-gray-500">
              You haven&apos;t made any adoption request yet. Browse
              our available pets to find your new best friend.
            </p>
            <Link
              href="/home"
              className="mt-4 inline-flex rounded-full bg-[#651028] px-5 py-2 text-xs font-semibold text-white"
            >
              Browse Pets
            </Link>
          </div>
        </div>
      )}

      {!loading && requests.length > 0 && (
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {requests.map((request) => {
            const status = (request?.status || 'pending').toLowerCase()
            const statusLabel = status === 'approved' ? 'APPROVED' : 'PENDING'
            const badgeClass = status === 'approved' ? 'bg-[#dfe7ff] text-[#2a3a7a]' : 'bg-[#f1d7da] text-[#651028]'
            const imageSrc = request?.petImage || request?.petImageSrc || request?.imageSrc

            return (
              <div key={request?._id || `${request?.petId}-${request?.userId}`} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={request?.petName || 'Pet'}
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f3e8d5] text-lg font-semibold text-[#651028]">
                        {(request?.petName || 'P')[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-[#3b2f2f]">{request?.petName || 'Pet'}</h3>
                      <p className="text-xs text-gray-500">Requested on {formatDate(request?.createdAt)}</p>
                      <p className="text-xs text-gray-500">Pickup Date: {formatDate(request?.pickupDate)}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${badgeClass}`}>{statusLabel}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/home/detail/${request?.petId}`}
                    className="rounded-full bg-[#651028] px-4 py-2 text-[11px] font-semibold text-white"
                  >
                    View Details
                  </Link>

                  {status === 'pending' ? (
                    <button
                      type="button"
                      onClick={() => handleCancel(request?.petId)}
                      className="rounded-full border border-[#651028] px-4 py-2 text-[11px] font-semibold text-[#651028]"
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="rounded-full bg-[#651028] px-4 py-2 text-[11px] font-semibold text-white"
                      >
                        Complete Process
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-[#651028] px-4 py-2 text-[11px] font-semibold text-[#651028]"
                      >
                        Message Admin
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RequestsPage
