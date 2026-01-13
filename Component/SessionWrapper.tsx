"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

function SessionWrapper({children} : {children : ReactNode}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper