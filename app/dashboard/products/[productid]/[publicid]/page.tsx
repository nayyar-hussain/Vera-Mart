"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useProductStore } from '@/zustand/ProductStore'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const params  = useParams()
  const productid = params.productid
  const publicid = decodeURIComponent(params.publicid as string)
  const [loading, setloading] = useState(false)

  const [updateProduct, setupdateProduct] = useState({
    name : '',
    description : '',
    price : '',

  })
  const initialState = useProductStore((state) => state.initialState)
  useEffect(() => {
   setupdateProduct({
    name : initialState?.name || '',
    description : initialState?.description || '',
    price : initialState?.price || ''
   })
   
  }, [])
  

  const [image, setimage] = useState<File | null>(null)

  const router = useRouter()

  const handleProductInfo = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name , value} = e.target;
    setupdateProduct((prev) => ({...prev, [name] : value}))
  }

  const upload = async () => {
    const form =new FormData()
    form.append('file', image!)
    form.append('public_id', publicid!)
    const {data} = await axios.post(`/api/upload`,form)
    if(data.status == 200) {
      return {
        url : data?.upload?.secure_url,
        public_id : data?.upload?.public_id
      }
    }
  }
  const addProductDetail = async (e : React.FormEvent<HTMLFormElement >) => {
    try {

          e.preventDefault()
          setloading(true)
    const {name , description ,price} = updateProduct
    let public_id : null | string = null;
    let image_url : null | File = null
    const Upload = await upload()
    if(Upload) {
      public_id = Upload.public_id;
      image_url = Upload.url
    }

    const {data} = await axios.put(`/api/product/${productid}`,{name , description , price , imageUrl : image_url , public_id })
    if(data.status == 200){
      router.push(`/dashboard/products`)
    }

      
    } catch (error) {
      throw error
    }finally {
      setloading(false)
    }
    
  }
  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
           <h1 className="text-2xl font-bold">Update Product</h1>

         <form onSubmit={addProductDetail} className="space-y-4">
        {/* Product Name */}
        <div>
          <label   className="block mb-1 font-medium">Product Name</label>
          <Input onChange={handleProductInfo} value={updateProduct.name} type="text" name='name' placeholder="Enter product name" />
        </div>

        {/* Description */}
        <div>
          <label  className="block mb-1 font-medium">Description</label>
          <Textarea onChange={handleProductInfo} value={updateProduct.description} name="description" placeholder="Enter product description" />
        </div>

        {/* Price */}
        <div>
          <label   className="block mb-1 font-medium">Price &#163;</label>
          <Input onChange={handleProductInfo} value={updateProduct.price} name="price" type="number" placeholder="Enter product price" />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <Input onChange={(e) => setimage(e.target.files?.[0] || null) } type="file" accept="image/*" />
        </div>

        {/* Submit */}
        <Button type="submit">{loading ? <Loader2 className="h-10 w-10 animate-spin text-white" /> : 'Update Product'}</Button>
      </form>
      
       </div>
  )
}

export default page