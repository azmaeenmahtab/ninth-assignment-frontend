"use client"

import React from 'react'
import Image from 'next/image'
import logo from '@/assets/mainlogo.png'
import loginpagecat from "@/assets/loginpagecat.png"
import googleIcon from '@/assets/google.png'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const LoginIndex = () => {
  const router = useRouter()
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('')
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData)

    const email = values.email;
    const password = values.password

    if(!email || !password){
      setFormError("Email and Password are required!")
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email: email, // required
        password: password, // required
      });

      if (error) {
        setFormError(error || 'Sign up failed. Please try again.')
        console.log(error)
        return
      }
      // console.log(data)

      router.push("/home")
    }catch(error){
      setFormError('Sign in failed. Please try again.')
      console.log(error)
    }
  

    
  }
  return (
    <section className="px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-8 py-10 sm:px-10">
            <div className='pb-5'>
              <Image alt='logo' src={logo} width={200} height={100} />
            </div>
            <h1 className="text-2xl font-semibold text-[#4b0f1d]">Sign In</h1>
            <p className="mt-2 text-sm text-gray-500">Use your email and password</p>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                type='email'
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                />
                <input
                name='password'
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                />
              </div>

              <button type='submit' className="mt-6 w-full rounded-full bg-[#651028] px-5 py-3 text-sm font-semibold text-white">
                Sign In
              </button>

              
            </form>
            <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700"
              >
                <Image src={googleIcon} alt="Google" width={18} height={18} />
                Sign in with Google
              </button>


          </div>

          <div className="relative bg-gradient-to-b from-[#4b0f1d] via-[#651028] to-[#7a1633] text-white pt-10">
            <div className='text-center'>
              <h1>Don&apos;t have a account?</h1>
              <Link
                href="/auth/signup"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#7a1633]"
              >
                Sign Up
              </Link>
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
