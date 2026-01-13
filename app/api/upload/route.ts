import cloudinary from "@/lib/Cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const form = await req.formData()
    const file = form.get('file') as File
    const public_id = form.get('public_id') as string | null
    console.log(public_id);
    
    if(public_id) {
        cloudinary.uploader.destroy(public_id)
        return NextResponse.json({status : 200})
    }

    if(!file){
        return NextResponse.json({status : 404})
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const upload = await new Promise((resolve , reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder : 'ecom_folder'},
            (error , result) =>{
                if(error) reject(error)
                    else resolve(result)
            }
        )
        stream.end(buffer)
    })
   return NextResponse.json({status : 200 , upload})
}