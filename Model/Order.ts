import mongoose, { Schema, model, models } from "mongoose"

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      
    }
  ],

  address: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    phone: { type: String, required: true }
  },

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }
}, { timestamps: true })

const Order = models.Order || model("Order", orderSchema)
export default Order
