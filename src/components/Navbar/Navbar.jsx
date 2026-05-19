"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import mainLogo from '@/assets/mainlogo.png'
import { signOut, useSession } from '@/lib/auth-client'

const Navbar = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const userName = session?.user?.name || 'User'
  const userImage = session?.user?.image
  const userInitial = userName?.trim()?.[0]?.toUpperCase() || 'U'
  
  return (
    <header className="w-full border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/home" className="flex items-center gap-2">
          <Image src={mainLogo} alt="Main logo" width={200} height={40} priority />
        </Link>

        <nav className="flex items-center gap-6">
          <Link className="text-sm font-semibold text-(--text) hover:text-(--text)" href="/home">
            Home
          </Link>
          <Link className="text-sm font-semibold text-(--text) hover:text-(--text)" href="/pets">
            All Pets
          </Link>
          <Link className="text-sm font-semibold text-(--text) hover:text-(--text)" href="/requests">
            My Requests
          </Link>
          <Link className="text-sm font-semibold text-(--text) hover:text-(--text)" href="/add-pet">
            Add Pet
          </Link>
        </nav>

        {session?.user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-2 py-1 text-sm font-semibold text-[var(--text)] hover:border-gray-400"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                  {userInitial}
                </span>
              )}
              <span className="max-w-[120px] truncate">{userName}</span>
              <svg
                className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
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
                className="absolute z-10 right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-lg"
                role="menu"
              >
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-gray-50"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
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
        ) : (
          <Link
            href="/auth/login"
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-[var(--text)] hover:border-gray-400"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
