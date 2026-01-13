
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Contact from "@/Model/Contact"
import { ConnectToDatabase } from "@/lib/Database"
import { signOut } from "next-auth/react"
import SidebarLogout from "./SidebarLogout"

export default async function Sidebar() {
  await ConnectToDatabase()
  const res = await Contact.find()
  const contactLength = res.length;
 
  return (
    <aside className="w-64 border-r bg-background p-6 flex flex-col justify-between h-screen">
      {/* Top section */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start cursor-pointer">
            <Link href="/dashboard/addproduct">Add Product</Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start cursor-pointer">
            <Link href="/dashboard/orders">Orders</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start cursor-pointer">
            <Link href="/dashboard/products">Products</Link>
          </Button>
          <Button  variant="ghost" className={`relative w-full justify-start  cursor-pointer`}>
            <Link href="/dashboard/messages">Messages</Link>
            {contactLength > 0 && 
            
            <span className="w-3 h-3 rounded-full bg-red-500 absolute right-0 text-white text-[8px] ">{contactLength}</span>
            }
          </Button>
        </div>
      </div>

      {/* Logout at bottom */}
      <div>
       <SidebarLogout/>
      </div>
    </aside>
  )
}
