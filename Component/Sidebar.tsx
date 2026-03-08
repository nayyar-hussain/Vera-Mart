import Link from "next/link"
import Contact from "@/Model/Contact"
import { ConnectToDatabase } from "@/lib/Database"
import SidebarLogout from "./SidebarLogout"
import { LayoutDashboard, PackagePlus, ShoppingBag, Box, MessageSquare, Sparkles } from "lucide-react"

export default async function Sidebar() {
  await ConnectToDatabase()
  const res = await Contact.find()
  const contactLength = res.length

  const navItems = [
    {
      label: "Add Product",
      href: "/dashboard/addproduct",
      icon: <PackagePlus className="w-4 h-4" />,
      badge: null,
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: null,
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: <Box className="w-4 h-4" />,
      badge: null,
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: contactLength > 0 ? contactLength : null,
    },
  ]

  return (
    <aside className="w-64 h-screen bg-[#0a0a14] border-r border-white/[0.06] flex flex-col justify-between sticky top-0">

      {/* Top glow line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="flex flex-col flex-1 p-5 overflow-y-auto">

        {/* ── Brand ── */}
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_4px_12px_rgba(139,92,246,0.4)]">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-violet-400" />
              <span className="text-[10px] text-white/30">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* ── Nav Label ── */}
        <p className="text-[10px] font-semibold text-white/25 tracking-widest uppercase px-3 mb-2">
          Navigation
        </p>

        {/* ── Nav Items ── */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-white/45 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-200"
            >
              <span className="text-white/30 group-hover:text-violet-400 transition-colors duration-200">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>

              {/* Badge */}
              {item.badge !== null && (
                <span className="ml-auto min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-gradient-to-br from-violet-500 to-cyan-400 rounded-full text-[10px] font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.5)] animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Bottom: Logout ── */}
      <div className="p-5 border-t border-white/[0.06]">
        <SidebarLogout />
      </div>
    </aside>
  )
}