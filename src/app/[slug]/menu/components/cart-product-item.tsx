import type { CartProduct } from "@/app/[slug]/menu/contexts/cart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

const CartProductItem = ({ product }: { product: CartProduct }) => {
  return (
    <div className="flex items-center justify-between">
      {/* esquerda */}
      <div className="relative size-20">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs">{product.name}</p>
        <p className="font-semibold text-sm">{formatCurrency(product.price)}</p>
        <div className="flex items-center gap-1">{}</div>
      </div>
      <Button variant="outline" className="size-8">
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export default CartProductItem;
