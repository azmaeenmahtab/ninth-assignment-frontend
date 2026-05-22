"use client"

import React from 'react'
import Image from 'next/image'
import dogBannerPic from '@/assets/dogbannerpic.png'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const BannerIndex = () => {
    const router = useRouter()
    const session = useSession()

    const handleAdoptNowClick = () => {
        if (session.isPending) return
        if (!session?.data?.user) {
            return router.push('/auth/login')
        }
        router.push('/all-pets')
    }

    return (
        <section className="px-4 pb-10">
            <div className="mx-auto w-full max-w-7xl">
                <div className="relative overflow-hidden rounded-[48px] bg-linear-to-r from-[#4b0f1d] via-[#651028] to-[#7a1633]">
                    <div className="grid items-center gap-10 pl-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="text-white">
                            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                Find the Right
                                <br />
                                Dog for You
                            </h1>
                            <p className="mt-4 max-w-md text-base text-white/80">
                                Take our interactive new quiz to find the perfect dog to adopt!
                            </p>
                            <button onClick={handleAdoptNowClick} className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#4b0f1d] cursor-pointer hover:bg-gray-100">
                                Adopt Now
                            </button>
                        </div>
                        <div className="relative">
                            <Image
                                src={dogBannerPic}
                                alt="Golden retriever"
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

export default BannerIndex