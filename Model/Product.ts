import { model, models, Schema } from "mongoose";


const productSchema : Schema = new Schema({
    name : {type : String , required : true},
    price : {type : String , required : true},
    description : {type : String , required : true},
    imageUrl : {type : String , required : true},
    public_id : {type : String ,required : true}
}, {timestamps : true})

const Product = models.Product || model('Product' , productSchema)
export default Product