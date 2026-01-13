"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {useAddToCart} from './AddToCartFunction';
import { Input } from '@/components/ui/input';

interface IProduct {
        _id : string,
        name : string,
        description : string,
        price : string,
        imageUrl : string
    
}

    


 function CartComponent({products} : {products : IProduct[]}) {

  const addToCart = useAddToCart()
  const [search, setsearch] = useState('')

  const productsFilter = products.filter((product) => {
    const searchValue = search.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchValue)
    )
  })

    
  return (
    <div>
       <div className="p-4 w-full  mt-5">
      <Input
      value={search}
       onChange={(e) => setsearch(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="block mx-auto max-w-md rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
      <div className=" px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {
          productsFilter.length > 0 ? (
             productsFilter.map((product) => (
                    <Card key={product._id} className="rounded-2xl shadow-md p-1">
                <CardHeader className='p-1'>
                  <div className="relative h-48 w-full">
                    {product.imageUrl && 
                    
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="rounded-xl object-cover"
                    />
                    }
                  </div>
                </CardHeader>
                <CardContent className='p-1'>
                  <CardTitle className="text-xl line-clamp-1">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="mt-3 font-semibold text-lg">£{product.price}</p>
                </CardContent>
                <CardFooter className='p-1'>
                  <Button onClick={() => addToCart(product._id , 'increase')}  className="w-full cursor-pointer">Add to Cart</Button>
                </CardFooter>
              </Card>
    
            ))
          ) : (
             <p className="text-center text-muted-foreground">
          No products found
        </p>
          )
           
        }
      </div>

    </div>
  )
}

export default CartComponent