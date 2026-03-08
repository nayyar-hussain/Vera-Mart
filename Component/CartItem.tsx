"use client"
import Image from 'next/image'
import { Trash2, Minus, Plus } from "lucide-react"
import useAddToCart from './AddToCartFunction'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IProduct {
  _id: string
  name: string
  description: string
  imageUrl: string
  price: string
}

interface ICartItem {
  _id: string
  cartId: string
  quantity: number
  product: IProduct
}

function CartItem({ cartItems }: { cartItems: ICartItem[] }) {
  const router = useRouter()
  const addToCart = useAddToCart()

  const deleteCart = async (id: string) => {
    const { data } = await axios.put(`/api/user/${id}`)
    if (data.status == 200) {
      router.push('/ecom/cart')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="group relative flex gap-4 bg-[#0f0f1c] border border-white/[0.07] rounded-3xl p-4 hover:border-violet-500/25 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-300"
        >
          {/* Product Image */}
          <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white/[0.03]">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between min-w-0">
            <div>
              <h2 className="font-semibold text-white text-base line-clamp-1 group-hover:text-violet-300 transition-colors duration-200">
                {item.product.name}
              </h2>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold text-lg mt-0.5">
                £{item.product.price}
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-1">
                <button
                  onClick={() => addToCart(item.product._id, 'decrease')}
                  className="w-7 h-7 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-violet-500/20 hover:text-violet-300 text-white/50 transition-all duration-200 cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item.product._id, 'increase')}
                  className="w-7 h-7 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-violet-500/20 hover:text-violet-300 text-white/50 transition-all duration-200 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Line total */}
              <span className="text-xs text-white/25 ml-1">
                = £{(Number(item.product.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteCart(item.product._id)}
            className="self-start flex items-center justify-center w-8 h-8 rounded-xl bg-red-500/[0.08] border border-red-500/[0.12] text-red-400/60 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartItem