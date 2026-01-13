import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { ConnectToDatabase } from "./Database";
import User from "@/Model/User";

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.CLIENT_ID as string,
            clientSecret : process.env.CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    session : {
        strategy : 'jwt'
    },
    callbacks : {
        async signIn({user}) {
            try {
                await ConnectToDatabase()
                const isExist = await User.findOne({email : user.email})
                if(!isExist){
                    await User.create({
                        name : user.name,
                        email : user.email,
                        imageUrl : user.image
                    })
                }
                return true
            } catch (error) {
                 console.error('Error during sign-in:', error);
                return false;
            }
        },
             async jwt({token , user})  {

                if(user?.email){
                    const isExist = await User.findOne({email : user.email})
                    if(isExist){
                        token.id = isExist._id.toString()
                    }
                     
                }
                return token

        },

        async session({session , token}) {
            if(session?.user && token.id){
                session.user.id = token.id
            }
            return session
        },
        async redirect({baseUrl}){
            return `${baseUrl}/`; 
        },

        
    }


}