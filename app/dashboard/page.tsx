export const revalidate = 0

import DashboardCard from "@/Component/DashboardCard"
import DashboardList from "@/Component/DashboardList"
import { ConnectToDatabase } from "@/lib/Database"
import { getOrders } from "@/lib/getOrders"
import User from "@/Model/User"
import { Sparkles, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  await ConnectToDatabase()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const orderTotalDoc = await fetch(`${baseUrl}/api/Order/totalamount`, {
    cache: 'no-store'
  })
  const orderTotal = await orderTotalDoc.json()

  const res = await User.find()
  const resLength = res.length
  const plainOrder = await getOrders()
  const orderLength = plainOrder.length

  return (
    <div className="min-h-screen bg-[#07070f] p-6">

      {/* Ambient glows */}
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Overview</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dashboard{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Analytics
              </span>
            </h1>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Live</span>
            </div>
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <DashboardCard
            orderTotal={orderTotal.total}
            resLength={resLength}
            orderLength={orderLength}
          />
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Recent Orders ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Orders</h2>
            <span className="text-xs text-white/30">{orderLength} total</span>
          </div>
          <DashboardList plainOrder={plainOrder} />
        </div>

      </div>
    </div>
  )
}