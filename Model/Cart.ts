import mongoose,{ model, models, Schema } from "mongoose";

const cartSchema : Schema = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true , unique : true},
    items : [
        {
             productId : {type : mongoose.Types.ObjectId , ref : "Product" , required : true},
             quantity : {type : Number , default : 1},
        }
    ],
})

const Cart = models.Cart || model('Cart', cartSchema)
export default Cart