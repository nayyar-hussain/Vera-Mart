import { model, models, Schema } from "mongoose";

const contactSchema : Schema = new Schema({
    name : {type : String, required : true},
    email : {type : String , required : true},
    subject : {type : String , required : true},
    message : {type : String , required : true},
    
}, {timestamps : true})

const Contact =  models.Contact || model("Contact", contactSchema)
export default Contact