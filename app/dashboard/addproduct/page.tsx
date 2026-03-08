"use client"
import { useState } from "react"
import axios from "axios"
import { Loader2, PackagePlus, Type, AlignLeft, PoundSterling, ImagePlus, Sparkles, Upload } from "lucide-react"

interface IAddProduct {
  name: string
  description: string
  price: string
}

export default function AddProductPage() {
  const [loading, setloading] = useState(false)
  const [addProduct, setaddProduct] = useState<IAddProduct>({
    name: '',
    description: '',
    price: ''
  })
  const [image, setimage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleProductInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setaddProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setimage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const uploadImage = async () => {
    if (!image) return
    const form = new FormData()
    form.append('file', image)
    const { data } = await axios.post('/api/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return {
      url: data?.upload?.secure_url,
      public_id: data?.upload?.public_id
    }
  }

  const addProductDetail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setloading(true)
      const { name, description, price } = addProduct
      const imageUrl = await uploadImage()
      if (!imageUrl) return
      const { data } = await axios.post('/api/Admin', {
        name, description, price,
        imageUrl: imageUrl.url,
        public_id: imageUrl.public_id
      })
      if (data.status == 200) {
        setaddProduct({ name: '', price: '', description: '' })
        setimage(null)
        setPreview(null)
        alert('Product Uploaded')
      }
    } catch (error) {
      throw error
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07070f] px-4 py-12">

      {/* Ambient glows */}
      <div className="fixed top-1/4 right-1/3 w-80 h-80 bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Admin Panel</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_4px_16px_rgba(139,92,246,0.4)]">
              <PackagePlus className="w-4.5 h-4.5 text-white" />
            </div>
            Add New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Product
            </span>
          </h1>
        </div>

        {/* ── Form Card ── */}
        <div className="relative">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10 pointer-events-none" />
          <div className="relative bg-[#0f0f1c]/90 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-7 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">

            <form onSubmit={addProductDetail} className="flex flex-col gap-5">

              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Product Name</label>
                <div className="relative">
                  <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                  <input
                    onChange={handleProductInfo}
                    value={addProduct.name}
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-3.5 top-3.5 w-4 h-4 text-white/20 pointer-events-none" />
                  <textarea
                    onChange={handleProductInfo}
                    value={addProduct.description}
                    name="description"
                    rows={4}
                    placeholder="Enter product description"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Price (£)</label>
                <div className="relative">
                  <PoundSterling className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                  <input
                    onChange={handleProductInfo}
                    value={addProduct.price}
                    name="price"
                    type="number"
                    placeholder="Enter product price"
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Product Image</label>

                {/* Preview */}
                {preview && (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-white/[0.07] mb-1">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <label className="flex flex-col items-center justify-center gap-2 w-full py-6 bg-white/[0.03] border border-dashed border-white/[0.12] rounded-2xl hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    <Upload className="w-4 h-4 text-white/30" />
                  </div>
                  <span className="text-sm text-white/30">
                    {image ? image.name : "Click to upload image"}
                  </span>
                  <span className="text-xs text-white/15">PNG, JPG, WEBP accepted</span>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <PackagePlus className="w-4 h-4" />
                    Add Product
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}