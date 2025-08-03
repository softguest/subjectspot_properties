// components/Navbar.tsx
'use client'

import { Menu, Search, Globe, UserCircle2, PlusIcon } from 'lucide-react'
// import { Span } from 'next/dist/trace'
// import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
          <span className="font-bold text-xl">Subject<span className=''>Spot.</span></span>
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
          <input
            type="text"
            placeholder="Search destinations"
            className="outline-none w-64 bg-transparent text-sm"
          />
          <Search size={16} className="text-gray-600 ml-2" />
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:inline text-sm font-medium">Find Property</button>
          <Globe className="text-gray-600 hover:text-black cursor-pointer" />

          <Link href="/properties/create">
            <div className="flex items-center border rounded-full p-2 space-x-2 hover:shadow-md transition">
              <PlusIcon size={16} className="text-gray-600" />
                Property
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
