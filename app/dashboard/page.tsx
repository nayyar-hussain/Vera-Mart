export const revalidate = 0


import DashboardCard from "@/Component/DashboardCard"
import DashboardList from "@/Component/DashboardList"
import { ConnectToDatabase } from "@/lib/Database"
import { getOrders } from "@/lib/getOrders"
import User from "@/Model/User"

export default async function DashboardPage() {
  await ConnectToDatabase()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const orderTotalDoc = await fetch(`${baseUrl}/api/Order/totalamount`, {
    cache : 'no-store'
  })
  const orderTotal = await orderTotalDoc.json()
  
  const res = await User.find()
  const resLength = res.length
  const plainOrder = await getOrders()
   const orderLength = plainOrder.length;

  return (
    <div className="space-y-6 my-10 pr-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        
      <DashboardCard orderTotal={orderTotal.total} resLength={resLength} orderLength={orderLength}/>
        
      </div>

      {/* Recent Orders */}
     <DashboardList plainOrder={plainOrder}/>
    </div>
  )
}
