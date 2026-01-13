import CartItem from "@/Component/CartItem"
import { authOptions } from "@/lib/Auth"
import { ConnectToDatabase } from "@/lib/Database"
import Cart from "@/Model/Cart"
import { getServerSession } from "next-auth"
import Link from "next/link"


export default async function CartPage() {
  await ConnectToDatabase()
  
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  const cartItemsDocu = await Cart.findOne({userId}).populate('items.productId')
  
if (!cartItemsDocu) {
  return <div className="p-10">Cart is empty</div>
}

const cartId = cartItemsDocu._id.toString()

const cartItems = cartItemsDocu.items.map(i  => ({
  _id: i._id.toString(),
  cartId,                     // ✅ cart id add
  quantity: i.quantity,
  product: {
    _id: i.productId._id.toString(),
    name: i.productId.name,
    description: i.productId.description,
    price: Number(i.productId.price),
    imageUrl: i.productId.imageUrl,
  },
}))
 let subtotal = cartItems.reduce((sum : number , item) => {
    return sum + item.product.price * item.quantity;
   }, 0) 

   let shipping = 100;
   let total = shipping + subtotal;
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Cart Items */}
       <CartItem cartItems={cartItems}/>

        {/* Summary */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>£{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>£{shipping}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>£{total}</span>
          </div>
         
          <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            <Link href={'/ecom/order'}>
            Proceed to Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
