import CustomerMessages from '@/Component/CustomerMessages'
import { ConnectToDatabase } from '@/lib/Database'
import Contact from '@/Model/Contact'
import { IContact, IContactDTO } from '@/types/contact'
import React from 'react'

async function page() {
   await ConnectToDatabase()
    const contactDoc = await Contact.find()
   const contact :IContact[] = contactDoc.map((c : IContactDTO) => ({
    _id : c._id.toString(),
    name : c.name,
    email : c.email,
    subject : c.subject,
    message : c.message

   }))
  return (
    <CustomerMessages contact={contact}/>
  )
}

export default page