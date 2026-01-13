import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const adminEmail = ['nayyarhussain125@gmail.com']

export async function middleware(req : NextRequest){
   const Token = await getToken({req , secret: process.env.NEXTAUTH_SECRET})
   const userEmail = Token?.email;
   if(!userEmail || !adminEmail.includes(userEmail)){
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
   }

   return NextResponse.next()

}

export const config = {
    matcher : ['/dashboard/:path*']
}