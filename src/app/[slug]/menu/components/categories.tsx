"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import type { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const { products, total, totalQuantity, toggleCart } =
    useContext(CartContext);

  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return category.id === selectedCategory.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-[100] mt-[-1.5rem] rounded-t-3xl border-2 bg-white shadow-slate-900 md:mx-auto md:w-[550px] md:border-slate-600/30">
      <div className="p-5">
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

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-8">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              className="rounded-full"
              size="sm"
              variant={getCategoryButtonVariant(category)}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h2 className="px-5 pt-2 font-semibold text-base">
        {selectedCategory.name}
      </h2>
      <Products
        products={selectedCategory.products}
        restaurantSlug={restaurant.slug}
      />
      {products.length > 0 && (
        <div className="fixed right-0 bottom-0 left-0 mx-auto flex w-full items-center justify-between border border-t bg-white px-5 py-3 sm:w-[390px]">
          <div>
            <p className="to-muted-foreground text-xs">Total dos pedidos</p>
            <p className="font-semibold text-sm">
              {formatCurrency(total)}
              <span className="font-normal text-muted-foreground text-xs">
                /{totalQuantity} {totalQuantity <= 1 ? " item" : " itens"}
              </span>
            </p>
          </div>

          <Button onClick={toggleCart}>Ver sacola</Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
