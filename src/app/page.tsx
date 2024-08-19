"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import ENav from "@/components/Navbar";
import Ppage from "@/components/Product";
import Eproducts from "@/components/products";
import Ekart from "@/components/ShoppingCart";
import { Button } from "@headlessui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ENav></ENav>
      <Eproducts></Eproducts>

      {/*<Ppage></Ppage><Eproducts></Eproducts>
      <Ekart></Ekart><Ppage></Ppage>
      <Eproducts></Eproducts>
       */}
      {/**/}
    </div>
  );
}
