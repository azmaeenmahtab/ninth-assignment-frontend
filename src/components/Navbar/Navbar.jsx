import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import mainLogo from '@/assets/mainlogo.png'

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
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

        <Link
          href="/login"
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-[var(--text)] hover:border-gray-400"
        >
          Log In
        </Link>
      </div>
    </header>
  )
}

export default Navbar
