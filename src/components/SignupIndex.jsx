"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import signupBanner from '@/assets/signuppagebanner.png'
import googleIcon from '@/assets/google.png'

const SignupIndex = () => {
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section className="px-4 py-10">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="relative">
          <Image
            src={signupBanner}
            alt="Pets banner"
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div ref={formRef} className="px-8 py-10">
          <h1 className="text-2xl font-semibold text-[#4b0f1d]">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us and find your perfect pet</p>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
            />
            <input
              type="url"
              placeholder="Photo URL"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
            />
          </div>

          <button className="mt-6 w-full rounded-full bg-[#4b0f1d] px-5 py-3 text-sm font-semibold text-white">
            Sign Up
          </button>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700">
            <Image src={googleIcon} alt="Google" width={18} height={18} />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#4b0f1d]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignupIndex
