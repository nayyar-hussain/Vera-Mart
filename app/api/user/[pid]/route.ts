import { authOptions } from "@/lib/Auth";
import { ConnectToDatabase } from "@/lib/Database";
import Cart from "@/Model/Cart";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(req:NextRequest , {params} : {params : Promise<{pid : string }>}) {
    const session = await getServerSession(authOptions)
     if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    const uid = session?.user?.id
    const {pid : productId} = await params
   
   
    const {action} = await req.json()

   if(!productId ){
    return NextResponse.json({status : 404})
   }

   await ConnectToDatabase()
   const cart = await Cart.findOne({userId : uid})
   if(!cart){
    await Cart.create({
        userId : uid,
        items : [{
            productId ,
            quantity : 1
        }]
    })
   } else {
    const itemIndex =  cart.items.findIndex((item : any) => item.productId.toString() === productId)
    if(itemIndex > -1){
        if(action === 'increase'){

            cart.items[itemIndex].quantity  +=1
        }
        if(action === 'decrease'){
            cart.items[itemIndex].quantity -= 1
        }
        if(cart.items[itemIndex].quantity <= 0){
            cart.items.splice(itemIndex , 1)
        }
    }else{
        cart.items.push({productId , quantity : 1})
    }
    await cart.save()
   }

   return NextResponse.json({status : 200 , cart})
}

export async function PUT(req: NextRequest , {params} : {params : Promise<{pid : string}>}){
    const { pid : productId} = await params
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    
    if( !productId || !userId){
        return NextResponse.json({status : 404})
    }
    await ConnectToDatabase()
    await Cart.updateOne(
        {userId : new mongoose.Types.ObjectId(userId)},
         {
        $pull : {
            items : {
                productId :new mongoose.Types.ObjectId(productId),
            }
        }
    })

    return NextResponse.json({status : 200})

}
