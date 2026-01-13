import Product from "@/Model/Product";
import { IProduct } from "@/types/product";

export const getProducts = async () : Promise<IProduct[]> => {

    const productDocu = await Product.find()
    const product : IProduct[] = productDocu.map((p) => ({
         _id : p._id.toString(),
        name : p.name,
        description : p.description,
        price :p.price,
        imageUrl : p.imageUrl,
        public_id : p.public_id,
        createdAt : p.createdAt.toISOString()
    }) )
    return product
} 