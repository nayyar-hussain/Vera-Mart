"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [cartLength, setcartLength] = useState(0);
  const fetchCartLength = async () => {
    const { data } = await axios.get("/api/user");
    console.log(data);

    setcartLength(data.cartLength);
  };
  useEffect(() => {
    fetchCartLength();
  }, []);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <Image src={`/logo.png`} width={70} height={50} alt="logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          {!session && (
            <li>
              <Link href="/">Home</Link>
            </li>
          )}

          <li>
            <Link href="/ecom">Products</Link>
          </li>
          <li>
            <Link href="/ecom/about">About</Link>
          </li>
          <li>
            <Link href="/ecom/contact">Contact Us</Link>
          </li>
          {session?.user?.email === "nayyarhussain125@gmail.com" && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        {/* Right Side */}

        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/ecom/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartLength > 0 ? (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full"></span>
            ) : (
              <></>
            )}
          </Link>
          {session?.user?.email && (
            <Button className="cursor-pointer" onClick={() => signOut()}>
              Logout <LogOut />
            </Button>
          )}
          {/* Profile / Login */}
          <div>
            {session?.user?.image ? (
              <Image
                className="rounded cursor-pointer"
                src={session?.user?.image}
                alt="profile"
                width={40}
                height={40}
              />
            ) : (
              <Link href={"/"}>
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col p-4 gap-4 text-gray-700">
            {!session && (
              <li>
                <Link href="/">Home</Link>
              </li>
            )}
            <li>
              <Link href="/ecom/about">About</Link>
            </li>
            <li>
              <Link href="/ecom">Product</Link>
            </li>
            <li>
              <Link href="/ecom/contact">Contact Us</Link>
            </li>{" "}
            {session?.user?.email === "nayyarhussain125@gmail.com" && (
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
