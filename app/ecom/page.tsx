export const revalidate = 0

import Image from "next/image";
import Product from "@/Model/Product";
import { ConnectToDatabase } from "@/lib/Database";
import CartComponent from "@/Component/Cart";




export default async function ProductPage() {
  await ConnectToDatabase()
  const productsDocu = await Product.find().sort({created : -1})
  const products = productsDocu.map((p) => ({
    _id: p._id.toString(),   
  name: String(p.name),
  description: String(p.description),
  price: String(p.price),  
  imageUrl: String(p.imageUrl),
  }))


  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-[300px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold">Our Latest Products</h1>
          <p className="mt-2 text-lg">Best quality at affordable prices</p>
        </div>
      </div>

      {/* Cards Section */}
      <div>
        
      </div>
      <div >
       
         <CartComponent  products={products}/>
        
      </div>
    </div>
  );
}
