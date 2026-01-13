import DashboardOrderList from "@/Component/DashboardOrderList"
import { ConnectToDatabase } from "@/lib/Database"
import { getOrders } from "@/lib/getOrders"


export default async function OrdersPage() {
  await ConnectToDatabase()
  const Orders = await getOrders()
  return (
    <div className="space-y-6 my-10 pr-5">
     <DashboardOrderList Orders={Orders}/>
    </div>
  )
}
