import { ConnectToDatabase } from "@/lib/Database";
import Product from "@/Model/Product"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    await ConnectToDatabase()
    const {name , description , imageUrl , price, public_id} = await req.json()
    
    if(!name || !description || !imageUrl || !price || !public_id){
        return NextResponse.json({status : 404})
    }
    await Product.create({
        name , description , imageUrl , price, public_id
    })
            return NextResponse.json({status : 200})

}


