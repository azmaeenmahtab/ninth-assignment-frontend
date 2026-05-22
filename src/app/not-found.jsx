"use client"

import React from 'react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f3e8d5] px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f7e6e9] text-2xl">🐾</div>
        <h1 className="mt-6 text-3xl font-semibold text-[#651028]">Page not found</h1>
        <p className="mt-3 text-sm text-gray-600">
          We could not find the page you were looking for. It might have moved or no longer exists.
        </p>
        <Link
          href="/home"
          className="mt-6 inline-flex rounded-full bg-[#651028] px-6 py-2 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
