import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111318] border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between">

          {/* Left - Logo + Tagline */}
          <div className="max-w-xs">
            <Image src="/images/logo.png" alt="HireLoop" width={120} height={32} />
            <p className="mt-4 text-sm leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right - Link Columns */}
          <div className="flex flex-wrap gap-12">

            {/* Product */}
            <div>
              <h4 className="text-indigo-400 font-medium mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Job discovery</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Worker AI</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Companies</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Salary data</Link></li>
              </ul>
            </div>

            {/* Navigations */}
            <div>
              <h4 className="text-indigo-400 font-medium mb-4">Navigations</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Help center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Career library</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-violet-400 font-medium mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Brand Guideline</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Newsroom</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <Link href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            {/* Pinterest */}
            <Link href="#" className="w-9 h-9 rounded-full bg-[#6D28D9] hover:bg-[#7C3AED] flex items-center justify-center transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
          </div>

          {/* Copyright + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
            <span>Copyright 2024 — Tashim Tishan</span>
            <span className="hidden sm:block text-white/20">|</span>
            <div className="flex gap-1">
              <Link href="#" className="hover:text-white transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="#" className="hover:text-white transition-colors">Privacy Guideline</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}