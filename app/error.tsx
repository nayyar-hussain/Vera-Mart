"use client"

import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function error({ reset }: { reset: () => void }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070f] px-4">

      {/* Ambient glows */}
      <div className="fixed top-1/3 left-1/3 w-80 h-80 bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/3 w-64 h-64 bg-violet-600/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">

        {/* Glow border card */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-red-500/15 via-transparent to-violet-500/10 pointer-events-none" />

        <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-8 text-center shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-red-500/10 border border-red-500/20 animate-pulse" />
              <AlertTriangle className="w-7 h-7 text-red-400 relative z-10" />
            </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Something went{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              wrong
            </span>
          </h1>

          <p className="text-sm text-white/35 leading-relaxed mb-8">
            Our team is fixing the issue. Please try again shortly.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default error