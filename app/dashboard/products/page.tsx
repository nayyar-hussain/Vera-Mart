export const revalidate = 0

import ProductCard from '@/Component/ProductCard'
import { ConnectToDatabase } from '@/lib/Database'
import { getProducts } from '@/lib/getProducts'
import { Box, Sparkles } from 'lucide-react'

async function page() {
  await ConnectToDatabase()
  const Products = await getProducts()

  return (
    <div className="min-h-screen bg-[#07070f] p-6">

      {/* Ambient glows */}
      <div className="fixed top-1/4 right-1/3 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">

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
                Products
              </span>
            </h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl">
              <Box className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white/50">
                {Products.length} total
              </span>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <ProductCard Products={Products} />
        </div>

      </div>
    </div>
  )
}

export default page