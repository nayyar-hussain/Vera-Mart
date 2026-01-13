"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { IContact } from "@/types/contact"
import { deleteMessage } from "@/app/actions/contact.action"

interface IContactResponse {
    contact : IContact[]
}
 function CustomerMessages({contact} : IContactResponse) {

  return (
 <div className="flex flex-col gap-4 p-4  ">
      {contact.map((c) => (

        <Card key={c._id} className="shadow-md hover:shadow-lg transition p-4 w-full">
          <CardHeader className="flex justify-between items-start">
            <CardTitle className="text-lg">{c.name}</CardTitle>
            <Button onClick={() => deleteMessage(c._id)} variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Subject:</strong> {c.subject}</p>
            <p><strong>Message:</strong> {c.message}</p>
          </CardContent>
        </Card>
      ))}
     
    </div>  )
}

export default CustomerMessages