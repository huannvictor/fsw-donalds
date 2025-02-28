import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";
import { ShoppingBagIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1 text-left">
            <ShoppingBagIcon size={16} />
            Sacola
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col gap-6 py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>

          <Card className="mb-6">
            <CardContent className="p-5">
              {/* <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{formatCurrency(subTotal)}</p>
              </div> */}

              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Total</p>
                <p className="font-semibold text-sm">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full rounded-full">Finalizar Pedido</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
