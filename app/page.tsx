'use client'
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const {data : session , status} = useSession()
  const router = useRouter()
   useEffect(() => {
    if(session?.user?.email){
      router.push('/ecom')
    }
  }, [session, router])
  if(status === 'loading'){
    return <h1>Loading...</h1>
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center  bg-zinc-50 font-sans dark:bg-black">
      <div>
        <Button onClick={() => signIn('google')} className="flex items-center justify-center space-x-2 border border-gray-300 bg-white hover:bg-gray-100">
      <FcGoogle className="w-5 h-5" />
      <span className="text-black cursor-pointer">Sign in with Google</span>
    </Button>
      </div>
    </div>
  );
}
