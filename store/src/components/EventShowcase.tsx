"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useMemo, useEffect, useContext, use } from "react";
import { CartContext } from "@/app/layout";

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
  discount?: number;
}

interface ItemsShowcaseProps {
  items: Item[];
  discounts: any[];
}

export const EventShowcase = ({ items, discounts }: ItemsShowcaseProps) => {
  const { cart, setCart } = useContext<any>(CartContext);
  const [displayItems, setDisplayItems] = useState<Item[]>(items);

  const addToCart = (item: Item) => {
    console.log("Add to cart", item);
    setCart((prevCart: any) => [...prevCart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  };


  useEffect(() => {
    if (discounts.length > 0) {
      discounts.forEach((discount: any) => {
        if (displayItems.some((i: any) => i.id === discount.id)) {
          setDisplayItems((prevItems: any) =>
            prevItems.map((item: any) =>
              item.id === discount.id ? { ...item, discount: discount.discount } : item
            )
          );
        }
      });
    }
  }, [discounts]);

  useEffect(() => {
    console.log("Display items", displayItems);
  }, [displayItems]);

  return (
    <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayItems.map((item: Item) => (
        <div
          key={item.id}
          className="group relative flex flex-col rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        >
          <div className="relative aspect-[1] overflow-hidden rounded-t-xl">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex h-full flex-col justify-between p-5">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-[#099C77]">
                {item.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p>{item.description}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="font-medium">
                {item.discount ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-[#099C77] font-semibold">${(item.price - (item.price * item.discount) / 100).toFixed(2)}</span>
                    <span className="text-gray-400 line-through">${item.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-lg text-[#099C77]">
                    ${item.price}
                  </span>
                )}

              </div>
              <button onClick={() => { addToCart(item) }} className="rounded-lg bg-[#099C77]/10 px-3 py-1 text-sm font-medium text-[#099C77] hover:bg-[#099C77]/20 cursor-pointer transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
