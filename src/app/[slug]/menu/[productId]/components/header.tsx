"use client";

import { Button } from "@/components/ui/button";
import type { Product, Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductMenuHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductMenuHeader = ({ product }: ProductMenuHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="relative min-h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ProductMenuHeader;
