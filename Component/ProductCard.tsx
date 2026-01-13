"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IProduct } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import axios from "axios"
import { deleteProduct } from "@/app/actions/product.action"
import { useProductStore } from "@/zustand/ProductStore"
import { useRouter } from "next/navigation"

interface IPropsProduct {
    Products : IProduct[]
}

export default function ProductCard({Products}: IPropsProduct)  {

  const setInitialState = useProductStore((state) => state.setInitialState)
  const router = useRouter()

  const deleteProductAndCloudinaryImage = async (id : string , public_Id : string, ) =>{
    const formData = new FormData()
    await deleteProduct(id)
    formData.append('public_id', public_Id!) 
     const {data} = await axios.post(`/api/upload`, formData)
    if(data.status == 200){
      alert('product deleted')
    }
  }

  const setValueInZustand = (product : IProduct) => {
    const {_id : productId , public_id} = product
    setInitialState(product)
    router.push(`/dashboard/products/${productId}/${encodeURIComponent(public_id)}`)
  }
    
  return (
   <>
    {Products.map((product) => (
        <Card key={product._id} className="w-full p-2 ">
      <CardHeader className="p-0 flex justify-between ">
        {product.imageUrl &&
        
        <Image
          src={product.imageUrl}  // dummy image
          alt={product.name}
          width={70}
          height={70}
          className="rounded-t-lg object-cover"
        />
        }
        <div className="space-x-2">

        <Button onClick={() => setValueInZustand(product)} className="cursor-pointer"><Pencil/></Button>
        <Button onClick={() => deleteProductAndCloudinaryImage(product._id , product.public_id)} className="cursor-pointer"><Trash/></Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-2">
        {/* Product Name */}
        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
         
         {product.description}
        </p>

        {/* Price + ID */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold">
           £{product.price}
          </span>

          <Badge className="text-green-700" variant="secondary">
            ID: {product._id}
          </Badge>
        </div>
      </CardContent>
    </Card>
    ))}
   </>
  

  )
}
