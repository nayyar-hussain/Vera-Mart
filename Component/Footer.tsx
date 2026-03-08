import Link from "next/link";
import { ShoppingBag, Sparkles, Mail, ArrowRight, Twitter, Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07070f] border-t border-white/[0.06] mt-16">

      {/* Top glow line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* ── Brand ── */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_4px_16px_rgba(139,92,246,0.4)]">
                <ShoppingBag className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                MyShop
              </span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed">
              Best quality products at affordable prices. Curated for modern shoppers.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {["Home", "Products", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {["Help Center", "Privacy Policy", "Terms & Conditions", "Refund Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-white/35 mb-4 leading-relaxed">
              Subscribe for latest drops, deals & updates.
            </p>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-xl text-sm font-semibold text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_24px_rgba(139,92,246,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-full">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-[11px] text-white/30">Crafted with passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}