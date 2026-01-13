import { model, models, Schema } from "mongoose";


const userSchema : Schema = new Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    imageUrl : {type : String , required : true}
} , {timestamps : true})

const User = models.User || model('User' , userSchema)
export default User