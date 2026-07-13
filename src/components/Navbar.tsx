"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient} from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function Navbar() {
  const {data: session,isPending, error, refetch} = authClient.useSession() 
  console.log(isPending)
  console.log(session)
  const user=session?.user
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleSignout= async()=>{
    authClient.signOut()
  }

  return (
   <div className="border-b border-white/5">
     <nav className="sticky top-0 z-50 bg-[#222222] border-b border-white/5 container mx-auto rounded-lg mt-5 mb-5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="HireLoop" width={130} height={32} priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
         <Link href="/browsejobs" className="text-base text-white hover:text-indigo-400">Browse Jobs</Link>
          <Link href="/company" className="text-base text-white hover:text-indigo-400">Company</Link>
          <Link href="/pricing" className="text-base text-white hover:text-indigo-400">Pricing</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-px h-5 bg-white/10" />
         { user?
            <>
            <p>hi!!! {user?.name}</p>
            <Button onClick={handleSignout} variant="ghost">Logout</Button>
            </>
              : 
          <Link href="/sign-in" className="text-md text-indigo-400 hover:text-indigo-300 font-semibold">
          Sign In
          </Link>}
          <Link href="/get-started" className="text-sm font-semibold text-white bg-[#5D54FE] hover:bg-[#7C3AED] px-5 py-2 rounded-xl transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white">
          {isOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          <Link href="/jobs" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-sm">Browse Jobs</Link>
          <Link href="/company" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-sm">Company</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-sm">Pricing</Link>
          <hr className="border-white/10" />
          <Link href="/sign-in" onClick={() => setIsOpen(false)} className="text-indigo-400 text-md font-semibold">Sign In</Link>
          <Link href="/get-started" onClick={() => setIsOpen(false)} className="text-center text-sm font-semibold text-white bg-[#5D54FE] hover:bg-[#7C3AED] px-5 py-2 rounded-xl transition-colors">
            Get Started
          </Link>
        </div>
      )}
    </nav>
   </div>
  );
}