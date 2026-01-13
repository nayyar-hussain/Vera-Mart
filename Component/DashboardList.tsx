"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IOrderDTO } from "@/types/order";


interface IDashboardProps {
    plainOrder : IOrderDTO[]
} 

function DashboardList({ plainOrder } : IDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Product</th>
              <th className="py-2">Amount</th>
              <th className="py-2">User</th>
            </tr>
          </thead>

          <tbody>
            {plainOrder.slice(0, 3).map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2">{order._id}</td>
                <td className="py-2">
                  {order.items[0]?.product.name}
                </td>
                <td className="py-2">
                  PKR {order.items[0]?.product.price}
                </td>
                <td className="py-2">{order.address.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default DashboardList;
