"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {  useState } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"

interface IAddProduct {
  name : string,
  description : string,
  price : string,
}

export default function AddProductPage() {
  
  
  const [loading, setloading] = useState(false)
  const [addProduct, setaddProduct] = useState<IAddProduct>({
    name : '',
    description : '',
    price : ''
  })
  const [image, setimage] = useState<File | null>(null)

  const handleProductInfo = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name , value} = e.target;
    setaddProduct((prev) => ({...prev, [name] : value}))
  }

  const uploadImage = async () => {
    if(!image){
      return
    }
    const form = new FormData()
    form.append('file' , image)
    const {data} = await axios.post('/api/upload', form ,{
      headers : {
        'Content-Type' : 'multipart/form-data'
      },
    })
    return {

     url : data?.upload?.secure_url,
     public_id : data?.upload?.public_id
    } 
  }

  const addProductDetail = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setloading(true)
      const {name , description , price } = addProduct;
    const imageUrl = await uploadImage()
    if(!imageUrl) return
   const {data} = await axios.post('/api/Admin', {name , description , price , imageUrl : imageUrl.url , public_id : imageUrl.public_id})
   if(data.status == 200) { 
    setaddProduct({
      name : '',
      price : '',
      description : '',

    })
    setimage(null)
    alert('Product Uploaded')
   }
    } catch (error) {
      throw error
    } finally {
      setloading(false)
    }
    
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Product</h1>

      <form onSubmit={addProductDetail} className="space-y-4">
        {/* Product Name */}
        <div>
          <label   className="block mb-1 font-medium">Product Name</label>
          <Input onChange={handleProductInfo} value={addProduct.name} type="text" name='name' placeholder="Enter product name" />
        </div>

        {/* Description */}
        <div>
          <label  className="block mb-1 font-medium">Description</label>
          <Textarea onChange={handleProductInfo} value={addProduct.description} name="description" placeholder="Enter product description" />
        </div>

        {/* Price */}
        <div>
          <label   className="block mb-1 font-medium">Price (PKR)</label>
          <Input onChange={handleProductInfo} value={addProduct.price} name="price" type="number" placeholder="Enter product price" />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <Input onChange={(e) => setimage(e.target.files?.[0] || null) } type="file" accept="image/*" />
        </div>

        {/* Submit */}
        <Button type="submit">{loading ? <Loader2 className="h-10 w-10 animate-spin text-white" /> : 'Add Product'}</Button>
      </form>
    </div>
  )
}
