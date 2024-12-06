"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/app/layout";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useContext<any>(CartContext);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };


  return (
    <>
      <div className={`fixed top-0 right-0 w-full h-full flex justify-end bg-black bg-opacity-50 z-50  ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className={`w-96 h-full bg-white shadow-lg overflow-auto transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-5 py-4 border-b-[1px]">
            <h3 className="text-xl font-semibold">Your Cart</h3>
            <X className="w-6 h-6 cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <div className="p-5">
            {
              cart.length > 0 ? (
                <>
                  {cart.map((item: any, index: number) => (
                    <div key={index} className="border p-4 mb-2 rounded shadow flex flex-row gap-4">
                      <img src={item.image} alt={item.name} className="w-32 object-contain mb-4" />
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        {
                          item.discount ? (
                            <div className="flex items-center space-x-2">
                              <p className="line-through text-gray-400">
                                ${item.price.toFixed(2)}
                              </p>
                              <p className="font-medium text-[#099C77]">
                                ${(item.price * ((100 - item.discount) / 100)).toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="font-medium text-[#099C77]">
                              ${item.price.toFixed(2)}
                            </p>
                          )
                        }
                      </div>
                    </div>
                  ))}
                  <p className="text-xl font-bold mt-4">
                    Total: ${cart.reduce((total: any, item: any) => total + (item.discount ? (100 - item.discount) / 100 : 1) * item.price, 0).toFixed(2)}
                  </p>
                  <Link href="/checkout">
                    <button onClick={() => { setIsSidebarOpen(false) }} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
                      Checkout
                    </button>
                  </Link>
                </>

              ) : (
                <p className="text-gray-600">Your cart is empty.</p>
              )
            }
          </div>
        </div>
      </div>
      <nav className="w-full flex items-center py-4 border-b-[1px] z-40">
        <div className="flex px-5 items-center justify-between max-w-[1200px] w-full mx-auto">
          <div className="flex items-center space-x-4 w-full">
            <h1 className="text-2xl font-semibold">Coffee Store</h1>

            <ul
              className="flex items-center space-x-4 w-full justify-between"
              role="tablist"
              aria-label="Main Navigation"
            >
              <li className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#099C77] transition-colors duration-200 border-b-2 border-transparent data-[active=true]:border-[#099C77] data-[active=true]:text-[#099C77]"
                  data-active={pathname === "/"}
                  role="tab"
                  aria-selected={pathname === "/"}
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer relative">
                <ShoppingCart className="w-6 h-6" onClick={openSidebar} />

                <span className="absolute -top-2 -right-2 bg-[#099C77] text-white w-4 h-4 flex items-center justify-center rounded-full text-xs">
                  {cart.length}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
