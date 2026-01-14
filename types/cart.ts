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
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
};
