"use server"


import { ConnectToDatabase } from "@/lib/Database"
import Contact from "@/Model/Contact"
import { redirect } from "next/navigation"

export const sendContactForm = async (formData : FormData) :  Promise<void> => {
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const subject = formData.get('subject')?.toString()
    const message = formData.get('message')?.toString()

    console.log(name , email , message , subject);
    

    if(!name || !email || !subject || !message){
        return
    }

    await ConnectToDatabase()

    await Contact.create({
        name , email , subject , message
    })

    redirect('/dashboard/messages')

    
}

export const deleteMessage = async (id : string) : Promise<void> => {
    if(!id) return
    await Contact.findByIdAndDelete(id)
}