"use client"
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

function SidebarLogout() {
  return (
    <Button
        onClick={() => signOut()}
          variant="destructive"
          className="w-full justify-start"
          
        >
          Logout
          <LogOut/>
        </Button>
  )
}

export default SidebarLogout