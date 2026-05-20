"use client";

import React, { useEffect, useState } from 'react'
import { useSession } from "@/lib/auth-client"
import Link from 'next/link'

const RequestsPage = () => {
  const { data: session } = useSession()
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) return

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/my-adoption-requests?userId=${userId}`)
        const data = await res.json()
        setRequests(data?.requests || [])
      } catch (error) {
        setRequests([])
      }
    }

    fetchRequests()
  }, [session?.user?.id])

  return (
    <div className="min-h-screen bg-[#f3e8d5] px-6">
 
      {requests.length === 0 && (
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

      {requests.length > 0 && (
        <div className="mt-8">
          {/* Requests UI will be implemented later */}
        </div>
      )}
    </div>
  )
}

export default RequestsPage
