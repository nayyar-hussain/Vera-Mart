"use client"
import { updateStatus } from '@/app/actions/order.action'
import { Card , CardHeader , CardTitle, CardContent } from '@/components/ui/card'
import { IOrderDTO } from '@/types/order'
import { useEffect, useState } from 'react'

interface IDashboardOrderList {
    Orders : IOrderDTO[]
}




function DashboardOrderList({Orders} : IDashboardOrderList) {

  const [status, setstatus] = useState('')

  const handleStatus = (e : React.ChangeEvent<HTMLSelectElement> , id : string) => {
    const newStatus = e.target.value;
  setstatus(newStatus)
  updateStatus(newStatus , id)
}




  return (
     <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Product</th>
                <th className="py-2">User</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Street</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order, idx) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2">{order.items.map(item => item.product.name.slice(0,20)+ '...').join(",")}</td>
                  <td className="py-2">{order.address.name}</td>
                  <td className="py-2">{order.address.phone}</td>
                  <td className="py-2">{order.address.street}</td>
                  <td className="py-2">$ {order.items.reduce((sum , item) =>  sum + Number(item.product.price) * item.quantity, 0)}</td>
                  <td className="py-2">

                  <select onChange={(e) => handleStatus(e , order._id)} name='status' value={order.status} className='cursor-pointer p-1 border-2 rounded outline-green-200 bg-green-100  border-green-200 text-green-700 font-medium'  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
  )
}

export default DashboardOrderList