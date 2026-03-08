"use client"
import { Trash2, Mail, Tag, MessageSquare, User } from "lucide-react"
import { IContact } from "@/types/contact"
import { deleteMessage } from "@/app/actions/contact.action"

interface IContactResponse {
  contact: IContact[]
}

function CustomerMessages({ contact }: IContactResponse) {
  return (
    <div className="flex flex-col gap-4">
      {contact.length > 0 ? contact.map((c) => (
        <div
          key={c._id}
          className="group relative bg-[#0f0f1c] border border-white/[0.07] rounded-3xl p-5 hover:border-violet-500/25 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-300"
        >
          {/* ── Top row ── */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600/40 to-cyan-500/40 border border-white/[0.08] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white/70">
                  {c.name?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors duration-200">
                  {c.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-white/25" />
                  <span className="text-xs text-white/35">{c.email}</span>
                </div>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteMessage(c._id)}
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-500/[0.08] border border-red-500/[0.15] text-red-400/60 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ── Divider ── */}
          <div className="w-full h-px bg-white/[0.05] mb-4" />

          {/* ── Details ── */}
          <div className="flex flex-col gap-3">
            {/* Subject */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-3 h-3 text-violet-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-0.5">Subject</p>
                <p className="text-sm text-white/60">{c.subject}</p>
              </div>
            </div>

            {/* Message */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-3 h-3 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-0.5">Message</p>
                <p className="text-sm text-white/50 leading-relaxed">{c.message}</p>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white/15" />
          </div>
          <p className="text-sm text-white/20">No messages yet</p>
        </div>
      )}
    </div>
  )
}

export default CustomerMessages