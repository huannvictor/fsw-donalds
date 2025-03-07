"use client";

import { Button } from "@/components/ui/button";
import type { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface RestaurantMenuHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl" | "slug">;
}

const RestaurantMenuHeader = ({ restaurant }: RestaurantMenuHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${restaurant.slug}/orders`);

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
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default RestaurantMenuHeader;
