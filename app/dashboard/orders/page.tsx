export const revalidate = 0

import DashboardOrderList from "@/Component/DashboardOrderList"
import { ConnectToDatabase } from "@/lib/Database"
import { getOrders } from "@/lib/getOrders"
import { ShoppingBag, Sparkles } from "lucide-react"

export default async function OrdersPage() {
  await ConnectToDatabase()
  const Orders = await getOrders()

  return (
    <div className="min-h-screen bg-[#07070f] p-6">

      {/* Ambient glows */}
      <div className="fixed top-1/4 right-1/3 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-full relative z-10">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Admin Panel</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Orders
              </span>
            </h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl">
              <ShoppingBag className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white/50">
                {Orders.length} total
              </span>
            </div>
          </div>
        </div>

        {/* ── Order List ── */}
        <DashboardOrderList Orders={Orders} />

      </div>
    </div>
  )
}