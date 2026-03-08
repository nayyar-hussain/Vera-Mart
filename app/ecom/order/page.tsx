"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { User, Phone, MapPin, Building2, Hash, ShoppingBag, Truck, Shield, Sparkles, ArrowRight, Package } from "lucide-react"

export default function OrderPage() {

  interface IProduct {
    _id: string
    name: string
    description: string
    price: string
    imageUrl: string
  }

  interface IProductItem {
    productId: IProduct
    quantity: number
  }

  const [address, setaddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    zipcode: ''
  })

  const [myOrders, setmyOrders] = useState<IProductItem[]>([])
  const { data: session, status } = useSession()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return
    const fetchMyOrders = async () => {
      const { data } = await axios.get('/api/Order')
      if (data.status == 200) {
        setmyOrders(data.myOrders)
      }
    }
    fetchMyOrders()
  }, [userId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 animate-pulse" />
          <p className="text-white/30 text-sm">Loading your order...</p>
        </div>
      </div>
    )
  }

const subtotal = myOrders.reduce((sum: number, item) => {
  if (!item.productId) return sum
  return sum + Number(item.productId.price) * item.quantity
}, 0)
  const shipping = 100
  const total = shipping + (subtotal || 0)

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setaddress((prev) => ({ ...prev, [name]: value }))
  }

  const sendAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await axios.post('/api/Order', { address })
    if (data.status == 200) {
      setaddress({ name: '', phone: '', street: '', zipcode: '', city: '' })
      alert('order placed')
    }
  }

  return (
    <div className="min-h-screen bg-[#07070f] px-4 py-14">

      {/* Ambient glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Almost there</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Check{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              out
            </span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── Shipping Form ── */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10 pointer-events-none" />
              <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-7 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">

                <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  Shipping Information
                </h2>

                <form onSubmit={sendAddress} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        <input
                          onChange={handleAddress}
                          name="name"
                          value={address.name}
                          placeholder="Enter your name"
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        <input
                          onChange={handleAddress}
                          name="phone"
                          value={address.phone}
                          placeholder="Enter phone number"
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">City</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        <input
                          onChange={handleAddress}
                          name="city"
                          value={address.city}
                          placeholder="Enter your city"
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Postal Code</label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        <input
                          onChange={handleAddress}
                          name="zipcode"
                          value={address.zipcode}
                          placeholder="Enter postal code"
                          className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Street */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-white/20 pointer-events-none" />
                      <textarea
                        onChange={handleAddress}
                        name="street"
                        value={address.street}
                        placeholder="Enter your street address"
                        rows={3}
                        className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer mt-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Place Order
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-3 bg-[#0f0f1c] border border-white/[0.06] rounded-2xl px-4 py-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/60">Fast Delivery</p>
                  <p className="text-[11px] text-white/25">3–7 working days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#0f0f1c] border border-white/[0.06] rounded-2xl px-4 py-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/60">Secure Order</p>
                  <p className="text-[11px] text-white/25">100% protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10 pointer-events-none" />
              <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">

                <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                  <Package className="w-4 h-4 text-violet-400" />
                  Order Summary
                </h2>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-5">
                  {myOrders.length > 0 ? myOrders.map((item) => (
                    <div key={item.productId._id} className="flex gap-3 items-center">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/[0.03]">
                        <Image
                          src={item.productId.imageUrl || ''}
                          alt={item.productId.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {item.productId.name || 'Product'}
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">
                          Qty: {item.quantity || 0}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-white/70 shrink-0">
                        £{Number(item.productId.price) * item.quantity || 0}
                      </p>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center py-6 gap-2">
                      <ShoppingBag className="w-8 h-8 text-white/10" />
                      <p className="text-xs text-white/20">No items yet</p>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/[0.06] mb-4" />

                {/* Totals */}
                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/40">Subtotal</span>
                    <span className="text-sm font-medium text-white">£{subtotal || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/40">Shipping</span>
                    <span className="text-sm font-medium text-white">£{shipping}</span>
                  </div>
                  <div className="w-full h-px bg-white/[0.06]" />
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-white">Total</span>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      £{total}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}