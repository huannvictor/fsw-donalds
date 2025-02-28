"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import type { Prisma } from "@prisma/client";
import { ChefHatIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

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
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () =>
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));

  const handleAddToCart = () => {
    addProduct({ ...product, quantity });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col space-y-5 rounded-t-3xl bg-white p-5">
        <div className="flex-auto">
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
                  onClick={handleDecrease}
                >
                  <MinusIcon />
                </Button>
                <p className="w-4">{quantity}</p>
                <Button
                  variant="destructive"
                  className="size-8 rounded-xl"
                  onClick={handleIncrease}
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
        </div>
        <Button
          variant="default"
          className="w-full rounded-full"
          onClick={handleAddToCart}
        >
          Adicionar à Sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
