"use server"
import { ConnectToDatabase } from "@/lib/Database"
import Order from "@/Model/Order"
import { redirect } from "next/navigation"

export const updateStatus = async (status : string , id : string) : Promise<void> => {
    if(!status) return
 
    
    await ConnectToDatabase()
  
    await Order.findByIdAndUpdate(id , {
        $set : {
            status , paymentStatus : 'paid'
        }
    }, {new : true})
    redirect('/dashboard/orders')
}