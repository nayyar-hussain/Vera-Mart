import mongoose from "mongoose"

export interface IContact {
    _id : string,
    name : string,
    email : string,
    subject : string,
    message : string
}
export interface IContactDTO {
    _id : mongoose.Types.ObjectId,
    name : string,
    email : string,
    subject : string,
    message : string
}