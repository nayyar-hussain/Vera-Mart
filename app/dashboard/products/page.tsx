export const revalidate = 0


import ProductCard from '@/Component/ProductCard'
import { ConnectToDatabase } from '@/lib/Database'
import { getProducts } from '@/lib/getProducts'

async function page() {
    await ConnectToDatabase()
    const Products = await getProducts()
  return (
    <div className='grid gap-4 my-10 pr-4'>

        <ProductCard Products={Products}/>
    </div>
  )
}

export default page