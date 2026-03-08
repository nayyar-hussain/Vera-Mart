"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, LogOut, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [cartLength, setCartLength] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const fetchCartLength = async () => {
    const { data } = await axios.get("/api/user");
    setCartLength(data.cartLength);
  };

  useEffect(() => {
    fetchCartLength();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
   
      <div className="h-5 "/>

      <header
        className={`w-full sticky top-0 z-50 px-4 transition-all duration-500 ${
          scrolled ? "pt-2 pb-1" : "pt-0"
        }`}
      >
        <nav
          className={`
            max-w-7xl mx-auto px-5 flex items-center justify-between relative
            bg-[#08080f]/85 backdrop-blur-2xl
            border border-white/[0.06] rounded-2xl
            shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
            transition-all duration-500
            ${scrolled ? "h-14" : "h-[68px]"}
          `}
        >
          {/* Ambient shimmer top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent pointer-events-none" />

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              width={60}
              height={42}
              alt="logo"
              className="rounded-xl"
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {!session && (
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                >
                  Home
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/ecom"
                className="block px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/ecom/about"
                className="block px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/ecom/contact"
                className="block px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              >
                Contact
              </Link>
            </li>
            {session?.user?.email === "nayyarhussain125@gmail.com" && (
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 rounded-xl transition-all duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2.5">

            {/* Cart */}
            <Link
              href="/ecom/cart"
              className="relative flex items-center justify-center w-[42px] h-[42px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] text-white/70 hover:text-white hover:bg-white/[0.09] hover:border-white/[0.15] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-200"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {cartLength > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-0.5 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#08080f] shadow-[0_0_12px_rgba(139,92,246,0.6)] animate-pulse">
                  {cartLength}
                </span>
              )}
            </Link>

            {/* Logout */}
            {session?.user?.email && (
              <button
                onClick={() => signOut()}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-red-500/[0.08] border border-red-500/[0.15] rounded-xl text-red-300/90 text-[13px] font-medium hover:bg-red-500/[0.15] hover:border-red-500/30 hover:text-red-200 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            )}

            {/* Avatar / User icon */}
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="profile"
                width={40}
                height={40}
                className="rounded-xl border-[1.5px] border-violet-500/40 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-200 cursor-pointer"
              />
            ) : (
              <Link
                href="/"
                className="flex items-center justify-center w-[42px] h-[42px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] text-white/60 hover:text-white hover:bg-white/[0.09] transition-all duration-200"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center w-[42px] h-[42px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <Menu className="w-[18px] h-[18px]" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      {open && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-[min(340px,90vw)] bg-[#0a0a14]/[0.98] border-l border-white/[0.06] flex flex-col p-6 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]">

            {/* Drawer header */}
            <div className="flex items-center justify-between pb-5 mb-2 border-b border-white/[0.06]">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-cyan-300">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 bg-white/[0.05] border border-white/[0.08] rounded-[10px] text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer links */}
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {!session && (
                <li>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-3.5 rounded-2xl text-white/60 font-medium hover:text-white hover:bg-white/[0.05] hover:pl-6 border border-transparent hover:border-white/[0.07] transition-all duration-200"
                  >
                    Home
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/ecom"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-2xl text-white/60 font-medium hover:text-white hover:bg-white/[0.05] hover:pl-6 border border-transparent hover:border-white/[0.07] transition-all duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/ecom/about"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-2xl text-white/60 font-medium hover:text-white hover:bg-white/[0.05] hover:pl-6 border border-transparent hover:border-white/[0.07] transition-all duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/ecom/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-2xl text-white/60 font-medium hover:text-white hover:bg-white/[0.05] hover:pl-6 border border-transparent hover:border-white/[0.07] transition-all duration-200"
                >
                  Contact Us
                </Link>
              </li>
              {session?.user?.email === "nayyarhussain125@gmail.com" && (
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3.5 rounded-2xl text-violet-400 bg-violet-500/[0.07] font-medium hover:bg-violet-500/[0.14] border border-transparent hover:border-violet-500/20 transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Drawer logout */}
            {session?.user?.email && (
              <div className="mt-auto pt-5 border-t border-white/[0.06]">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/[0.08] border border-red-500/[0.15] rounded-2xl text-red-300 font-medium hover:bg-red-500/[0.15] hover:border-red-500/30 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}