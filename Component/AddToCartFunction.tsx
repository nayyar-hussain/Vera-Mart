"use client"
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';



export function useAddToCart() {

        const router = useRouter()

     const addToCart = async (pid : string , action : string) => {
        if(!pid  || !action ) {
            return 
        }

        const {data} = await axios.post(`/api/user/${pid}`, {action})

        if(data.status === 200){
            router.push('/ecom/cart')
        }
    }

  return addToCart
}

export default useAddToCart