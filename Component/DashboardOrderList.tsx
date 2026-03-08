"use client"
import { updateStatus } from '@/app/actions/order.action'
import { IOrderDTO } from '@/types/order'
import { useState } from 'react'
import { Hash, Package, User, Phone, MapPin, DollarSign, Activity } from 'lucide-react'

interface IDashboardOrderList {
  Orders: IOrderDTO[]
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:    { label: "Pending",    color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
  processing: { label: "Processing", color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  shipped:    { label: "Shipped",    color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20" },
  delivered:  { label: "Delivered",  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  cancelled:  { label: "Cancelled",  color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/20" },
}

function DashboardOrderList({ Orders }: IDashboardOrderList) {
  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>(
    Object.fromEntries(Orders.map(o => [o._id, o.status]))
  )

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
    const newStatus = e.target.value
    setLocalStatuses(prev => ({ ...prev, [id]: newStatus }))
    updateStatus(newStatus, id)
  }

  const cols = [
    { label: "#",       icon: <Hash className="w-3 h-3" /> },
    { label: "Product", icon: <Package className="w-3 h-3" /> },
    { label: "Customer",icon: <User className="w-3 h-3" /> },
    { label: "Phone",   icon: <Phone className="w-3 h-3" /> },
    { label: "Street",  icon: <MapPin className="w-3 h-3" /> },
    { label: "Amount",  icon: <DollarSign className="w-3 h-3" /> },
    { label: "Status",  icon: <Activity className="w-3 h-3" /> },
  ]

  return (
    <div className="bg-[#0f0f1c] border border-white/[0.07] rounded-3xl overflow-hidden">

      {/* Header row */}
      <div className="grid grid-cols-7 gap-3 px-6 py-3 border-b border-white/[0.05] bg-white/[0.02]">
        {cols.map((col) => (
          <div key={col.label} className="flex items-center gap-1.5">
            <span className="text-white/20">{col.icon}</span>
            <span className="text-[10px] font-semibold text-white/30 tracking-widest uppercase">
              {col.label}
            </span>
          </div>
        ))}
      </div>

      {/* Rows */}
      {Orders.length > 0 ? (
        <div className="divide-y divide-white/[0.04]">
          {Orders.map((order, idx) => {
            const currentStatus = localStatuses[order._id] || order.status
            const cfg = statusConfig[currentStatus] || statusConfig.pending
            const total = order.items.reduce(
              (sum, item) => sum + Number(item.product.price) * item.quantity, 0
            )

            return (
              <div
                key={order._id}
                className="grid grid-cols-7 gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors duration-200 group items-center"
              >
                {/* # */}
                <div>
                  <span className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-[10px] font-bold text-violet-400">
                    {idx + 1}
                  </span>
                </div>

                {/* Product */}
                <div className="min-w-0">
                  <p className="text-sm text-white/60 truncate group-hover:text-white/80 transition-colors duration-200">
                    {order.items.map(item => item.product.name.slice(0, 15) + '...').join(", ")}
                  </p>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600/40 to-cyan-500/40 border border-white/[0.08] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white/60">
                      {order.address.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <span className="text-sm text-white/50 truncate">{order.address.name}</span>
                </div>

                {/* Phone */}
                <div>
                  <span className="text-sm text-white/40 font-mono">{order.address.phone}</span>
                </div>

                {/* Street */}
                <div className="min-w-0">
                  <span className="text-sm text-white/40 truncate block">{order.address.street}</span>
                </div>

                {/* Amount */}
                <div>
                  <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    £{total}
                  </span>
                </div>

                {/* Status Select */}
                <div>
                  <select
                    onChange={(e) => handleStatus(e, order._id)}
                    name="status"
                    value={currentStatus}
                    className={`w-full text-xs font-semibold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition-all duration-200 bg-transparent ${cfg.color} ${cfg.bg} ${cfg.border}`}
                  >
                    <option value="pending"    className="bg-[#0f0f1c] text-amber-400">Pending</option>
                    <option value="processing" className="bg-[#0f0f1c] text-blue-400">Processing</option>
                    <option value="shipped"    className="bg-[#0f0f1c] text-violet-400">Shipped</option>
                    <option value="delivered"  className="bg-[#0f0f1c] text-emerald-400">Delivered</option>
                    <option value="cancelled"  className="bg-[#0f0f1c] text-red-400">Cancelled</option>
                  </select>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <Package className="w-5 h-5 text-white/15" />
          </div>
          <p className="text-sm text-white/20">No orders yet</p>
        </div>
      )}
    </div>
  )
}

export default DashboardOrderList