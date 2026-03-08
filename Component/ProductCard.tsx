"use client"
import Image from "next/image"
import { IProduct } from "@/types/product"
import { Pencil, Trash2, Hash } from "lucide-react"
import axios from "axios"
import { deleteProduct } from "@/app/actions/product.action"
import { useProductStore } from "@/zustand/ProductStore"
import { useRouter } from "next/navigation"

interface IPropsProduct {
  Products: IProduct[]
}

export default function ProductCard({ Products }: IPropsProduct) {
  const setInitialState = useProductStore((state) => state.setInitialState)
  const router = useRouter()

  const deleteProductAndCloudinaryImage = async (id: string, public_Id: string) => {
    const formData = new FormData()
    await deleteProduct(id)
    formData.append('public_id', public_Id!)
    const { data } = await axios.post(`/api/upload`, formData)
    if (data.status == 200) {
      alert('product deleted')
    }
  }

  const setValueInZustand = (product: IProduct) => {
    const { _id: productId, public_id } = product
    setInitialState(product)
    router.push(`/dashboard/products/${productId}/${encodeURIComponent(public_id)}`)
  }

  return (
    <>
      {Products.map((product) => (
        <div
          key={product._id}
          className="group relative flex flex-col bg-[#0f0f1c] border border-white/[0.07] rounded-3xl overflow-hidden hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-300"
        >
          {/* ── Image ── */}
          <div className="relative h-44 w-full overflow-hidden bg-white/[0.03]">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-transparent to-transparent" />

            {/* Action buttons — top right */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setValueInZustand(product)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/40 hover:text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteProductAndCloudinaryImage(product._id, product.public_id)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/40 hover:text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col gap-2.5 p-4">
            <h2 className="text-base font-semibold text-white line-clamp-1 group-hover:text-violet-300 transition-colors duration-200">
              {product.name}
            </h2>

            <p className="text-sm text-white/35 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Price + ID */}
            <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] mt-1">
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                £{product.price}
              </span>

              <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg">
                <Hash className="w-3 h-3 text-white/20" />
                <span className="text-[10px] font-mono text-white/30">
                  {product._id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Edit / Delete buttons — always visible on mobile */}
            <div className="flex gap-2 mt-1 md:hidden">
              <button
                onClick={() => setValueInZustand(product)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-xs font-medium text-violet-400 hover:bg-violet-500/20 transition-all duration-200 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => deleteProductAndCloudinaryImage(product._id, product.public_id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}