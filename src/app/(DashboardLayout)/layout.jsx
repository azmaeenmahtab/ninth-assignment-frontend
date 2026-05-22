"use client"

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import mainLogo from '@/assets/mainlogo.png'
import { signOut, useSession } from '@/lib/auth-client'
import { RequestsModalProvider } from '@/lib/contexts/requestsmodalcontext'
import { DeleteConfirmModalProvider } from '@/lib/contexts/deleteconfirmmodalcontext'
import RequestsModal from '@/components/modals/requestsmodal'
import DeleteConfirmModal from '@/components/modals/deleteconfirmmodal'

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession()
  const fullName = session?.user?.name || 'User'
  const firstName = fullName.trim().split(' ')[0] || 'User'
  const email = session?.user?.email || ''
  const userImage = session?.user?.image
  const isValidImageUrl = typeof userImage === 'string' && /^https?:\/\//.test(userImage)
  const userInitial = firstName?.[0]?.toUpperCase() || 'U'
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()

  return (
    <RequestsModalProvider>
    <DeleteConfirmModalProvider>
    <div className="min-h-screen bg-white text-(--text)">
      <header className="sticky top-0 z-40 w-full bg-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/home" className="flex items-center gap-3">
            <Image src={mainLogo} alt="Main logo" width={170} height={36} priority />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full bg-white/5 px-3 py-2"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {isValidImageUrl ? (
                <Image
                  src={userImage}
                  alt={fullName}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  {userInitial}
                </span>
              )}
              <div className="text-left leading-tight">
                <p className="text-sm font-semibold text-(--text)">{firstName}</p>
                <p className="text-xs text-(--text)">{email}</p>
              </div>
              <svg
                className={`h-4 w-4 text-(--text) transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                role="menu"
              >
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  role="menuitem"
                  onClick={async () => {
                    setMenuOpen(false)
                    await signOut()
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-6">
        <section className="rounded-2xl bg-[#f3e8d5] px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="flex flex-col gap-3">
              <Link
                href="/dashboard/my-requests"
                className={
                  `rounded-full px-4 py-3 text-sm font-semibold shadow-sm ` +
                  (pathname === '/dashboard/my-requests'
                    ? 'bg-[#651028] text-white'
                    : 'border border-[#f1496b]/20 bg-white text-(--text)')
                }
              >
                My Requests
              </Link>
              <Link
                href="/dashboard/add-pet"
                className={
                  `rounded-full px-4 py-3 text-sm font-semibold shadow-sm ` +
                  (pathname === '/dashboard/add-pet'
                    ? 'bg-[#651028] text-white'
                    : 'border border-[#f1496b]/20 bg-white text-(--text)')
                }
              >
                Add Pet
              </Link>
              <Link
                href="/dashboard/my-listings"
                className={
                  `rounded-full px-4 py-3 text-sm font-semibold shadow-sm ` +
                  (pathname === '/dashboard/my-listings'
                    ? 'bg-[#651028] text-white'
                    : 'border border-[#f1496b]/20 bg-white text-(--text)')
                }
              >
                My Listings
              </Link>
            </aside>

            <div className="min-h-screen">
              {children}
            </div>
          </div>
        </section>
      </main>
      <RequestsModal />
      <DeleteConfirmModal />
    </div>
    </DeleteConfirmModalProvider>
    </RequestsModalProvider>
  )
}

export default DashboardLayout
