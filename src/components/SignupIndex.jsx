"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import signupBanner from '@/assets/signuppagebanner.png'
import googleIcon from '@/assets/google.png'
import logo from '@/assets/mainlogo.png'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'


const SignupIndex = () => {
  const router = useRouter()
  const formRef = useRef(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData)
    const password = `${values.password || ''}`
    const confirmPassword = `${values.confirmpassword || ''}`
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)

    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setFormError('Password must be at least 8 characters and include uppercase and lowercase letters.')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Password and confirm password must match.')
      return
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.photourl,
      })

      if (error) {
        setFormError(error.message || 'Sign up failed. Please try again.')
        console.log(error)
        return
      }
      await  authClient.getSession();
      router.push('/home')
      console.log(data)
    } catch (err) {
      setFormError('Sign up failed. Please try again.')
      console.log(err)
    }
  }

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

        <div ref={formRef} className="px-8 pb-10 pt-5">
          <div className='flex items-center justify-between'>
            <div>
              <h1 className="text-2xl font-semibold text-[#4b0f1d]">Create Account</h1>
              <p className="mt-2 text-sm text-gray-500">Join us and find your perfect pet</p>
            </div>
            <div>
              <Image alt='logo' src={logo} width={200} height={100} />
            </div>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                name='name'
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
              <input
                name='email'
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
              <input
                name='photourl'
                type="url"
                placeholder="Photo URL"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
              <input
                name='password'
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
              <input
                name='confirmpassword'
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
              />
            </div>

            {formError ? (
              <p className="text-sm text-red-600">{formError}</p>
            ) : null}

            <button type='submit' className="mt-4 w-full rounded-full bg-[#651028] px-5 py-3 text-sm font-semibold text-white">
              Sign Up
            </button>
          </form>

          <button
            onClick={async () => {
              setFormError("")
              try {
                const { data, error } = await authClient.signIn.social({
                  provider: "google",
                });
                if (error) {
                  setFormError(
                    error.message || "Google login failed."
                  );
                }
                console.log(data)
              } catch (error) {
                setFormError('Google sign-in failed. Please try again.');
                console.log(error);
              }
            }}
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700"
          >
            <Image src={googleIcon} alt="Google" width={18} height={18} />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-[#4b0f1d]">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </section>
  )
}

export default SignupIndex
