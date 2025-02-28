import { CartContext, type CartProduct } from "@/app/[slug]/menu/contexts/cart";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronDownIcon, ChevronUpIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

const CartProductItem = ({ product }: { product: CartProduct }) => {
  const { increaseProductQuantity, decreaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      {/* esquerda */}
      <div className="flex items-center gap-3">
        <div className="relative size-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate overflow-ellipsis text-xs">
            {product.name}
          </p>
          <p className="font-semibold text-sm">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="size-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronDownIcon />
            </Button>
            <p className="w-8 text-center text-xs">{product.quantity}</p>
            <Button
              variant="destructive"
              className="size-7 rounded-lg"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronUpIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* direita */}
      <Button
        variant="outline"
        className="size-8"
        onClick={() => removeProduct(product.id)}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export default CartProductItem;
