export interface IOrderItemsDTO {
    _id : string,
    quantity : number,
    product : {
        _id  : string,
        name : string,
        description : string,
        imageUrl : string,
        price : string
    }
}

export interface IOrderDTO {
    _id : string,
    userId : string,
    items : IOrderItemsDTO[],
    address : {
        name : string,
        phone : string,
        street : string,
        city : string,
        zipcode : string
    }
    totalAmount : number,
    status : string,
    paymentStatus : string
    createdAt : string
}