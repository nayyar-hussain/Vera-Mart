import { authOptions } from "@/lib/Auth";
import { ConnectToDatabase } from "@/lib/Database";
import Cart from "@/Model/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
   await ConnectToDatabase()
   const session = await getServerSession(authOptions)
   const userId = session?.user?.id
   if(!userId) {
    return NextResponse.json({status : 404})
   }

   const userItems = await Cart.findOne({userId})
   const cartLength = userItems.items.length
   console.log(cartLength)
   return NextResponse.json({status : 200 , cartLength})
}