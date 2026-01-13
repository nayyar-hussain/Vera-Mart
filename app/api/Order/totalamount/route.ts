import { ConnectToDatabase } from "@/lib/Database";
import Order from "@/Model/Order";
import { NextResponse } from "next/server";

export async function GET() {
    await ConnectToDatabase()
    const totalAmountOfAllOrder = await Order.aggregate([
        {$match : {paymentStatus : 'paid', status : 'delivered'}},
        { 
            $group : {_id : null ,total : {$sum : '$totalAmount'}}
        }
    ])
   const total = totalAmountOfAllOrder[0]?.total || 0
    return NextResponse.json({status : 200 , total})

    
}