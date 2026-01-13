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

export async function DELETE(req:NextRequest, {params} : {params : {id : string}}) {
    const productId = params.id
    if(!productId){
        return NextResponse.json({status : 404})
    }
    await Product.findByIdAndDelete(productId)
    return NextResponse.json({status : 200})
}

export async function PUT(req:NextRequest, {params}: {params : {id : string}}) {
    const productId = params.id
    const {name , description , imageUrl , price} = await req.json()
        if(!name || !description || !imageUrl || !price){
        return NextResponse.json({status : 404})
    }

    await Product.findByIdAndUpdate(productId , {name , description , imageUrl , price}, {new : true})
    return NextResponse.json({status : 200})
}