import React from 'react'
import Image from 'next/image'
import logo from '@/assets/mainlogo.png'
import loginpagecat from "@/assets/loginpagecat.png"
import googleIcon from '@/assets/google.png'
import { Link } from 'react-router-dom'

const LoginIndex = () => {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-8 py-10 sm:px-10">
            <div className='pb-5'>
                <Image src={logo} width={200} height={100}/>
            </div>
            <h1 className="text-2xl font-semibold text-[#4b0f1d]">Sign In</h1>
            <p className="mt-2 text-sm text-gray-500">Use your email and password</p>

            <div className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
            </div>

            <button className="mt-6 w-full rounded-full bg-[#6f1127] px-5 py-3 text-sm font-semibold text-white">
              Sign In
            </button>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700">
              <Image src={googleIcon} alt="Google" width={18} height={18} />
              Sign in with Google
            </button>

           
          </div>

          <div className="relative bg-gradient-to-b from-[#4b0f1d] via-[#651028] to-[#7a1633] text-white pt-10">
            <div className='text-center'>
                <h1>Don&apos;t have a account?</h1>
                <button className="mt-6 w-50% rounded-full bg-white text-[#7a1633] px-5 py-3 text-sm font-semibold ">
              Sign Up
            </button>
             </div>
            <div className="relative mx-auto w-full max-w-md">
              <Image
                src={loginpagecat}
                alt="cat"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginIndex
