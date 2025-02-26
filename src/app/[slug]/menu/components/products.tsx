import { formatCurrency } from "@/helpers/format-currency";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
  restaurantSlug: string;
}

const Products = ({ products, restaurantSlug }: ProductsProps) => {
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${restaurantSlug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {product.description}
            </p>
            <p className="pt-3 font-semibold text-sm">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.description}
              fill
              className="object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
