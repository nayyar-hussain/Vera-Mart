import Sidebar from '@/Component/Sidebar'
import  { ReactNode } from 'react'

function DashboardLayout({children}: {children : ReactNode}) {
  return (
    <div className='flex gap-10'>
        <Sidebar/>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout