import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-12 max-w-lg w-full text-center flex flex-col items-center gap-6">

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl font-bold">Payment Successful!</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Thank you for your purchase. A confirmation email has been sent to{' '}
              <span className="text-white font-medium">{customerEmail}</span>.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              If you have any questions, contact us at{' '}
              <a href="mailto:orders@example.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                orders@example.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2">
            <Link href="/browsejobs" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]">
              Go to Dashboard
            </Link>
          </div>

        </div>
      </div>
    )
  }
}