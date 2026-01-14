"use client"
import Image from 'next/image'
import { Trash2 } from "lucide-react"
import useAddToCart from './AddToCartFunction'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IProduct {
    _id : string,
    name : string,
    description : string,
    imageUrl : string,
    price : string
}


interface ICartItem {
  _id: string          // cart item id
  cartId: string       // ✅ cart id
  quantity: number
  product: IProduct
}



function CartItem({cartItems} : {cartItems : ICartItem[]}) {

  const router = useRouter()

  const deleteCart = async (id : string) => {
 const {data} = await axios.put(`/api/user/${id}`)
  if(data.status == 200){
    router.push('/ecom/cart')
  }
}


  const addToCart = useAddToCart()
  return (
    <>
    <div className="md:col-span-2 space-y-6">
      {cartItems.map(item => (
        <div
          key={item._id}
          className="flex gap-4 border rounded-lg p-4"
        >
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            width={100}
            height={100}
            className="rounded"
          />

          <div className="flex-1">
            <h2 className="font-semibold text-lg">
              {item.product.name}
            </h2>

            <p className="text-gray-600">
              Rs {item.product.price}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button onClick={() => addToCart(item.product._id, 'decrease')} className="cursor-pointer px-3 py-1 border rounded">-</button>
              <span>{item.quantity}</span>
              <button  onClick={() => addToCart(item.product._id, 'increase')} className="cursor-pointer px-3 py-1 border rounded">+</button>
            </div>
          </div>

          <button onClick={() => deleteCart(item.product._id)} className="cursor-pointer text-red-500 hover:text-red-600">
            <Trash2 />
          </button>
        </div>
      ))}
    </div>
    </>
  )
}

export default CartItem