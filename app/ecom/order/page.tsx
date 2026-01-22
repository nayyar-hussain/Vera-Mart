"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"


export default function OrderPage() {

  interface IProduct {
    
        _id : string,
        name : string,
        description : string,
        price : string,
        imageUrl : string
    
}

interface IProductItem {
  productId : IProduct,
  quantity : number
}




  const [address, setaddress] = useState({
    name : '',
    phone : '',
    street: '',
    city : '',
    zipcode : ''
  })

  const [myOrders, setmyOrders] = useState<IProductItem[]>([])
  const {data : session , status} = useSession()
  
  const userId  =  session?.user?.id
  const fetchMyOrders = async () => {
    
    if(!userId) return
    const {data} = await axios.get('/api/Order')
    if(data.status == 200){
      setmyOrders(data.myOrders)
      console.log(data.myOrders);
      
    }
  }

  useEffect(() => {
    if(!userId) return
     fetchMyOrders()
   
  }, [userId])
  if(status === 'loading') {
    return <h1>Loading...</h1>
  }
    const subtotal = myOrders.reduce((sum : number , item) => {
    return  sum + Number(item.productId.price) * item.quantity;
  }, 0)

  const shipping = 100;
  const total = shipping + subtotal


  

  const handleAddress = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name , value } = e.target;

    setaddress((prev) => ({...prev , [name] : value}))
  }
   const sendAddress = async (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const {data} = await axios.post('/api/Order', {address})
    if(data.status == 200){
      setaddress({
        name : '',
        phone : '',
        street : '',
        zipcode : '',
        city : ''
      })
      alert('order placed')
    }
  }




  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Shipping Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>

          <form onSubmit={sendAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input onChange={handleAddress} name="name" value={address.name} placeholder="Full Name" />
            <Input onChange={handleAddress} name="phone" value={address.phone} placeholder="Phone Number" />
            <Input onChange={handleAddress} name="city" value={address.city} placeholder="City" />
            <Input onChange={handleAddress} name="zipcode" value={address.zipcode} placeholder="Postal Code" />
            <Textarea
            onChange={handleAddress}
            name="street"
            value={address.street}
              placeholder="Street"
              className="md:col-span-2"
            />
            <Button className="w-full">Place Order</Button>
          </form>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Delivered Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {myOrders.length > 0 && myOrders.map((item) => (
              <div key={item.productId._id} className="flex gap-3">
                <Image
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  width={60}
                  height={60}
                  className="rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  Rs {Number(item.productId.price) * item.quantity}
                </p>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs {shipping}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <Button className="w-full mt-4">
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
