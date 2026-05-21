"use client";

import React, { useEffect, useState } from 'react'
import { useRequestsModal } from '@/lib/contexts/requestsmodalcontext'
import Spinner from '@/components/ui/Spinner'

const RequestsModal = () => {
  const { isOpen, petId, petName, closeModal } = useRequestsModal()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen || !petId) return

    const loadRequests = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/pet-adoption-requests?petId=${petId}`)
        const data = await res.json()
        setRequests(data?.requests || [])
      } catch (error) {
        setRequests([])
      } finally {
        setLoading(false)
      }
    }

    loadRequests()
  }, [isOpen, petId])

  const formatDate = (value) => {
    if (!value) return 'N/A'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleApprove = async (request) => {
    try {
      const res = await fetch('http://localhost:5000/approve-adoption-request', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId: request?.petId, userId: request?.userId })
      })
      if (res.ok) {
        setRequests((prev) => prev.map((item) => (
          item?.petId === request?.petId && item?.userId === request?.userId
            ? { ...item, status: 'approved' }
            : item
        )))
      }
    } catch (error) {
      // no-op for now
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#651028]">Adoption Requests</h3>
            <p className="text-[11px] text-gray-500">For {petName || 'this pet'}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full px-2 py-1 text-sm text-gray-500 hover:text-[#651028]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-2">
          {loading && (
            <div className="flex h-24 items-center justify-center">
              <Spinner />
            </div>
          )}

          {!loading && requests.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-xs text-gray-500">
              No adoption requests yet.
            </div>
          )}

          {!loading && requests.map((request) => {
            const status = (request?.status || 'pending').toLowerCase()
            const statusLabel = status.toUpperCase()
            const statusClass = status === 'approved'
              ? 'bg-[#dfe7ff] text-[#2a3a7a]'
              : status === 'rejected'
                ? 'bg-[#f7d6d9] text-[#8a2b2b]'
                : 'bg-[#f1d7da] text-[#651028]'

            return (
              <div key={request?._id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3e8d5] text-[10px] font-semibold text-[#651028]">
                        {(request?.userName || 'U')[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#3b2f2f]">{request?.userName || 'Applicant'}</p>
                        <p className="text-[10px] text-gray-500">{request?.userEmail || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-2 py-1 text-[9px] font-semibold ${statusClass}`}>{statusLabel}</span>
                    {/* <p className="mt-1 text-[9px] text-gray-400"></p> */}
                    <p className="text-[10px] font-semibold text-[#3b2f2f] mt-2">Pickup Date: {formatDate(request?.pickupDate)}</p>
                  </div>
                </div>

                {status !== 'approved' && (
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(request)}
                      className="flex-1 rounded-full bg-[#651028] px-3 py-2 text-[10px] font-semibold text-white"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-[#651028] px-3 py-2 text-[10px] font-semibold text-[#651028]"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RequestsModal
