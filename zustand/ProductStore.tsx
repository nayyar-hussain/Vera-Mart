import { IProduct } from "@/types/product";
import { create } from "zustand";


interface IProductStore {
   
    initialState : null | IProduct
    setInitialState : (product : IProduct) => void
}

export const useProductStore =  create<IProductStore>((set) => ({
    initialState : null,
    setInitialState : (product) => set({initialState : product})
}))