"use client"

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function error({reset}: {reset: () => void }) {

    const router = useRouter()
  return (
     <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-lg text-center space-y-4">
        
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="text-sm text-muted-foreground">
        Our team is fixing the issue. Please try again shortly.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <Button onClick={() => reset()}>
            Try Again
          </Button>

          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default error