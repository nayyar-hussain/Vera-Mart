import Product from "@/Model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest , {params} : {params :Promise<{productid : string}>}) {
    const {productid} = await params
    const {name , description , price , public_id , imageUrl} = await req.json()
    console.log(name , description , price , public_id , imageUrl);

    await Product.findByIdAndUpdate(productid , {name , description , price , public_id , imageUrl} , {new : true})

    return NextResponse.json({status : 200})
    
}