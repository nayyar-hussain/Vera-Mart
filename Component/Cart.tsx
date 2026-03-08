"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Search, Star, Heart, Zap } from "lucide-react";
import { useAddToCart } from "./AddToCartFunction";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

/* ─── Single Product Card ─── */
function ProductCard({ product }: { product: IProduct }) {
  const addToCart = useAddToCart();
  const [adding, setAdding] = useState(false);
  const [wished, setWished] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await addToCart(product._id, "increase");
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <div className="group relative flex flex-col bg-[#0f0f1c] border border-white/[0.07] rounded-3xl overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_50px_rgba(139,92,246,0.13)] transition-all duration-300">

      {/* ── Image Area ── */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-violet-950/40 to-cyan-950/20">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        )}

        {/* Bottom fade into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-[#0f0f1c]/10 to-transparent" />

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer
            ${wished
              ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
              : "bg-black/30 border-white/10 text-white/40 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10"
            }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wished ? "fill-rose-400" : ""}`} />
        </button>

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/[0.08]">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-semibold text-white/80">4.9</span>
        </div>

        {/* Price pinned bottom-left of image */}
        <div className="absolute bottom-3 left-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
            £{product.price}
          </span>
        </div>
      </div>

      {/* ── Text + CTA ── */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base line-clamp-1 group-hover:text-violet-300 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-white/35 text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <button
          onClick={handleAdd}
          disabled={adding}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer
            ${adding
              ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
              : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 active:translate-y-0"
            }`}
        >
          {adding ? (
            <>
              <Zap className="w-4 h-4 animate-pulse" />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
function CartComponent({ products }: { products: IProduct[] }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07070f] px-4 py-10">

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_24px_rgba(139,92,246,0.1)] transition-all duration-200"
        />
        {search && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/25">
            {filtered.length} found
          </span>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-white/15" />
          </div>
          <p className="text-white/25 text-sm">No products found</p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-violet-400 text-sm hover:text-violet-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CartComponent;