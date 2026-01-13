import { authOptions } from "@/lib/Auth";
import { ConnectToDatabase } from "@/lib/Database";
import Cart from "@/Model/Cart";
import Order from "@/Model/Order";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id;
    const {address} = await req.json()
    if(!userId){
        return NextResponse.json({status : 404 , msg :'user not login'})
    }

    await ConnectToDatabase()

    const cart = await Cart.findOne({userId}).populate('items.productId')
    if(!cart || cart.items.length === 0){
           return NextResponse.json({status : 400 , msg :'Order your product first'})

    }

   let orderItem = cart.items.map(item  => ({
    productId : item.productId._id,
    quantity : item.quantity,
    price : item.productId.price
   }))

   let total = orderItem.reduce((sum : number , item) => {
    return sum + item.price * item.quantity;
   }, 0) 

   const order = await Order.create({
    userId,
    address,
   totalAmount : total,
    items : orderItem
   })

    cart.items = []
    cart.save()
    return NextResponse.json({status : 200 , order})
}

export async function GET (req: NextRequest) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if(!userId){
        return NextResponse.json({status : 404 , msg :'user not login'})
    }
    await ConnectToDatabase()
      const pendingOrders = await Order.find({
    userId,
    status: { $ne: "delivered" } // pending orders
  }).populate("items.productId");

  const allPendingItems = pendingOrders.flatMap(order => order.items);

  return NextResponse.json({ status: 200, myOrders: allPendingItems });
}