import Sidebar from '@/Component/Sidebar'
import { ReactNode } from 'react'

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#07070f]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout