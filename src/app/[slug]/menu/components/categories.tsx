import type { MenuCategory, Prisma, Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-3xl border bg-white p-5">
      <div className="item-center flex gap-3">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={45}
          height={45}
        />
        <div>
          <h2 className="font-semibold text-lg">{restaurant.name}</h2>
          <p className="text-xs opacity-55">{restaurant.description}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-emerald-600 text-xs">
        <ClockIcon size={12} />
        <p>Aberto!</p>
      </div>
    </div>
  );
};

export default RestaurantCategories;
