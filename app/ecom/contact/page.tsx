import { sendContactForm } from '@/app/actions/contact.action'
import { Mail, User, FileText, MessageSquare, Send, Sparkles } from "lucide-react";

function page() {
  return (
    <div className="min-h-screen bg-[#07070f] flex items-center justify-center px-4 py-16">

      {/* Ambient glows */}
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Get in Touch</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Us
            </span>
          </h1>
          <p className="mt-3 text-white/35 text-sm leading-relaxed">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="relative">
          {/* Glow border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/15 pointer-events-none" />

          <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

            <form action={sendContactForm} className="flex flex-col gap-5">

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold text-white/40 tracking-widest uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-white/40 tracking-widest uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-semibold text-white/40 tracking-widest uppercase">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Order / Delivery / Refund"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold text-white/40 tracking-widest uppercase">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25 pointer-events-none" />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer mt-1"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

            </form>
          </div>
        </div>

        {/* Bottom trust note */}
        <p className="text-center text-xs text-white/20 mt-6">
          We typically respond within 24 hours via email or WhatsApp.
        </p>
      </div>
    </div>
  );
}

export default page;