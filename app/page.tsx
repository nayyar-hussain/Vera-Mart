'use client'
import { Button } from "@/components/ui/button";
import { Shield, ShoppingBag, Sparkles, Star } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const {data : session , status} = useSession()
  const router = useRouter()
   useEffect(() => {
    if(session?.user?.email){
      router.push('/ecom')
    }
  }, [session, router])
  if(status === 'loading'){
    return <h1>Loading...</h1>
  }
  
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07070f] overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-600/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">

        {/* Glow border effect */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/30 via-transparent to-cyan-500/20 pointer-events-none" />

        <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-8 flex flex-col items-center gap-6 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

          {/* Logo / Icon */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.5)]">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.05] border border-white/[0.08] rounded-full">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span className="text-[11px] font-medium text-white/50 tracking-widest uppercase">
                Welcome Back
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sign in to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                ShopName
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/35 leading-relaxed">
              Access your orders, wishlist & exclusive deals
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.06]" />

          {/* Google Button */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white hover:bg-gray-50 active:bg-gray-100 rounded-2xl text-sm font-semibold text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5 shrink-0" />
            Continue with Google
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-white/20" />
              <span className="text-[11px] text-white/25">Secure login</span>
            </div>
            <div className="w-px h-3 bg-white/[0.08]" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-white/20" />
              <span className="text-[11px] text-white/25">No password needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
