"use server"

import Product from "@/Model/Product"
import { redirect } from "next/navigation"

export const deleteProduct = async (id : string) => {
    if(!id) return
    await Product.findByIdAndDelete(id)
    redirect('/dashboard/products')
}