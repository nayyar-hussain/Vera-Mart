export const revalidate = 0;

import Image from "next/image";
import Product from "@/Model/Product";
import { ConnectToDatabase } from "@/lib/Database";
import CartComponent from "@/Component/Cart";
import { Sparkles, TrendingUp, Shield } from "lucide-react";

export default async function ProductPage() {
  await ConnectToDatabase();
  const productsDocu = await Product.find().sort({ created: -1 });
  const products = productsDocu.map((p) => ({
    _id: p._id.toString(),
    name: String(p.name),
    description: String(p.description),
    price: String(p.price),
    imageUrl: String(p.imageUrl),
  }));

  return (
    <div className="w-full min-h-screen bg-[#07070f]">

      {/* ── Hero Banner ── */}
      <div className="relative h-[420px] w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Banner"
          fill
          className="object-cover scale-105"
          priority
        />

        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/90 via-[#07070f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-transparent to-black/30" />

        {/* Ambient violet glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full left-0 right-0">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-full w-fit mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/60 tracking-widest uppercase">
              New Collection 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-xl">
            Our Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
              Products
            </span>
          </h1>

          <p className="mt-4 text-white/45 text-base md:text-lg max-w-sm leading-relaxed">
            Best quality at affordable prices — curated just for you.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.07] rounded-2xl">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/60 font-medium">
                {products.length}+ Products
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.07] rounded-2xl">
              <Shield className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/60 font-medium">
                Secure Checkout
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.07] rounded-2xl">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span className="text-sm text-white/60 font-medium">
                Free Shipping
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products Section ── */}
      <CartComponent products={products} />
    </div>
  );
}