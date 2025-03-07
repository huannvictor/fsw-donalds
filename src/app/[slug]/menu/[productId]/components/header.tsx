"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface ProductMenuHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductMenuHeader = ({ product }: ProductMenuHeaderProps) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative h-[250px] w-full md:h-[350px]">
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
        onClick={handleOrdersClick}
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
