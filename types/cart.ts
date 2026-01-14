import mongoose from "mongoose"

export interface ICart {
    _id : string,
    cartId : string
    quantity : number
    product : {
        _id : string
        name : string
        description : string
        imageUrl : string 
        price : string
    }
}

export type CartItemDoc = {
  _id: mongoose.Types.ObjectId;
  quantity: number;
  productId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
};
