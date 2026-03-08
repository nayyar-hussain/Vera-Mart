export default function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070f]">

      {/* Ambient glows */}
      <div className="fixed top-1/3 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/3 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5">

        {/* Spinner ring */}
        <div className="relative w-16 h-16">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 border-r-cyan-400 animate-spin" />
          {/* Inner glow dot */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 opacity-20 animate-pulse" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 animate-pulse shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-sm font-medium text-white/60">Loading, please wait</p>
          {/* Animated dots */}
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 rounded-full bg-violet-400/70 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 rounded-full bg-cyan-400/70 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

      </div>
    </div>
  )
}