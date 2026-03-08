export const revalidate = 0

import CartItem from "@/Component/CartItem"
import { authOptions } from "@/lib/Auth"
import { ConnectToDatabase } from "@/lib/Database"
import Cart from "@/Model/Cart"
import { CartItemDoc, ICart } from "@/types/cart"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { ShoppingBag, Truck, Shield, Tag, ArrowRight, Sparkles } from "lucide-react"

export default async function CartPage() {
  await ConnectToDatabase()

  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  const cartItemsDocu = await Cart.findOne({ userId }).populate('items.productId')

  // ── Empty Cart State ──
  if (!cartItemsDocu) {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center px-4">
        <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="flex flex-col items-center gap-5 text-center relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
            <ShoppingBag className="w-9 h-9 text-white/15" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
            <p className="text-white/35 text-sm mt-2">Looks like you haven't added anything yet.</p>
          </div>
          <Link
            href="/ecom"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const cartId = cartItemsDocu._id.toString()
  const cartItems: ICart[] = cartItemsDocu.items.map((i: CartItemDoc) => ({
    _id: i._id.toString(),
    cartId,
    quantity: i.quantity,
    product: {
      _id: i.productId._id.toString(),
      name: i.productId.name,
      description: i.productId.description,
      price: Number(i.productId.price),
      imageUrl: i.productId.imageUrl,
    },
  }))

  let subtotal = cartItems.reduce((sum: number, item) => {
    return sum + Number(item.product.price) * item.quantity
  }, 0)
  let shipping = 100
  let total = shipping + subtotal

  return (
    <div className="min-h-screen bg-[#07070f] px-4 py-14">

      {/* Ambient glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Page Header ── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Cart
            </span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── Cart Items (2 cols) ── */}
          <div className="md:col-span-2">
            <CartItem cartItems={cartItems} />
          </div>

          {/* ── Order Summary ── */}
          <div className="flex flex-col gap-4">

            {/* Summary card */}
            <div className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10 pointer-events-none" />
              <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">

                <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-violet-400" />
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/40">Subtotal</span>
                    <span className="text-sm font-medium text-white">£{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/40">Shipping</span>
                    <span className="text-sm font-medium text-white">£{shipping}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/[0.06] my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    £{total}
                  </span>
                </div>

                <Link href="/ecom/order">
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-[#0f0f1c] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/70">Fast Delivery</p>
                  <p className="text-[11px] text-white/30">3–7 working days nationwide</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/[0.04]" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/70">Secure Checkout</p>
                  <p className="text-[11px] text-white/30">Your payment is 100% protected</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}