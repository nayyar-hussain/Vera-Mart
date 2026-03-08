"use client";

import React from "react";
import { IOrderDTO } from "@/types/order";
import { Package, User, Hash, ShoppingBag } from "lucide-react";

interface IDashboardProps {
  plainOrder: IOrderDTO[];
}

function DashboardList({ plainOrder }: IDashboardProps) {
  return (
    <div className="bg-[#0f0f1c] border border-white/[0.07] rounded-3xl overflow-hidden">

      {/* Table header */}
      <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/[0.05] bg-white/[0.02]">
        {[
          { label: "Order ID", icon: <Hash className="w-3 h-3" /> },
          { label: "Product", icon: <Package className="w-3 h-3" /> },
          { label: "Amount", icon: <ShoppingBag className="w-3 h-3" /> },
          { label: "Customer", icon: <User className="w-3 h-3" /> },
        ].map((col) => (
          <div key={col.label} className="flex items-center gap-1.5">
            <span className="text-white/20">{col.icon}</span>
            <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">
              {col.label}
            </span>
          </div>
        ))}
      </div>

      {/* Rows */}
      {plainOrder.slice(0, 5).length > 0 ? (
        <div className="divide-y divide-white/[0.04]">
          {plainOrder.slice(0, 5).map((order, index) => (
            <div
              key={order._id}
              className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors duration-200 group"
            >
              {/* Order ID */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-[10px] font-bold text-violet-400 shrink-0">
                  {index + 1}
                </span>
                <span className="text-xs text-white/30 font-mono truncate">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>

              {/* Product */}
              <div className="flex items-center min-w-0">
                <span className="text-sm text-white/60 truncate group-hover:text-white/80 transition-colors duration-200">
                  {order.items[0]?.product.name || "—"}
                </span>
              </div>

              {/* Amount */}
              <div className="flex items-center">
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  £{order.items[0]?.product.price || 0}
                </span>
              </div>

              {/* Customer */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600/40 to-cyan-500/40 border border-white/[0.08] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-white/60">
                    {order.address.name?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                <span className="text-sm text-white/50 truncate">
                  {order.address.name || "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white/15" />
          </div>
          <p className="text-sm text-white/20">No orders yet</p>
        </div>
      )}
    </div>
  );
}

export default DashboardList;