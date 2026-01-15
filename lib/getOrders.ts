import Order from "@/Model/Order";
import { CartItemDoc } from "@/types/cart";
import { IOrderDTO } from "@/types/order";
import { ConnectToDatabase } from "./Database";

export const getOrders = async  () : Promise<IOrderDTO[]> => {
      await ConnectToDatabase()
      const orderRes = await Order.find({status : {$ne : 'delivered'}}).populate('items.productId')
    
      const plainOrder : IOrderDTO[] = orderRes.map(order => ({
        _id : order._id.toString(),
        userId : order.userId.toString(),
        items : order.items.map((item : CartItemDoc) => ({
          _id : item._id.toString(),
          quantity : item.quantity,
          product : {
            _id : item.productId._id.toString(),
            name : item.productId.name,
            description : item.productId.description,
            imageUrl : item.productId.imageUrl,
            price : item.productId.price
          }
        })),
        address : {
          name : order.address.name,
          street : order.address.street,
          city : order.address.city,
          phone : order.address.phone,
          zipcode : order.address.zipcode
        },
        totalAmount : order.totalAmount,
        status : order.status,
        paymentStatus : order.paymentStatus,
        createdAt : order.createdAt.toISOString()
      }))

      return plainOrder
    
    

} 