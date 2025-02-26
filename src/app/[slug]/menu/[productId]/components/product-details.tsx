"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import type { Prisma } from "@prisma/client";
import { ChefHatIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const addItem = () => setCurrentValue(currentValue + 1);
  const subtractItem = () =>
    setCurrentValue(currentValue === 0 ? 0 : currentValue - 1);
  return (
    <div className="relative z-50 mt-[-1.5rem] space-y-5 rounded-t-3xl bg-white p-5">
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              height={16}
              width={16}
              className="rounded-full object-contain"
            />
            <span className="text-muted-foreground text-xs">
              {product.restaurant.name}
            </span>
          </div>
          <h2 className="font-semibold text-sm">{product.name}</h2>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            {formatCurrency(product.price)}
          </h3>

          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="size-8 rounded-xl"
              onClick={() => subtractItem()}
            >
              <MinusIcon />
            </Button>
            <p className="w-4">{currentValue < 0 ? 0 : currentValue}</p>
            <Button
              variant="destructive"
              className="size-8 rounded-xl"
              onClick={() => addItem()}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="font-semibold text-base">Sobre</h2>
        <section className="text-muted-foreground text-sm">
          {product.description}
        </section>
      </section>

      {product.ingredients.length > 0 ? (
        <section className="space-y-2">
          <h2 className="flex items-center gap-1 text-center font-semibold text-base">
            <ChefHatIcon size={16} />
            Ingredientes
          </h2>
          <ul className="list-inside list-disc text-muted-foreground text-sm">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <Button variant="default" className="w-full rounded-full">
        Adicionar à Sacola
      </Button>
    </div>
  );
};

export default ProductDetails;
