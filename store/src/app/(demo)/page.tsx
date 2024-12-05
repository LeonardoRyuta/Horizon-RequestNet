"use client"

import { EventShowcase } from "@/components/EventShowcase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import itemsData from "@/const/data.json";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function DemoPage() {
  const [discounts, setDiscounts] = useState<any>([]);

  const items = itemsData.items;

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === "APPLY_DEAL") {
        const json = JSON.parse(event.data.data);

        console.log("APPLYING DEAL", json);
        setDiscounts((prevDiscounts: any) => [...prevDiscounts, json]);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  return (
    <>
      <section className="flex flex-col gap-2">
        <EventShowcase items={items} discounts={discounts} />
      </section>
    </>
  );
}
