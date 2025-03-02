"use server";

import { db } from "@/lib/prisma";
import type { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateHashFromEmail } from "../helpers/generateHashFromEmail";

interface CreateOrderInputProps {
  customerName: string;
  customerEmail: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  slug: string;
  consumptionMethod: ConsumptionMethod;
}

export const createOrder = async (input: CreateOrderInputProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug },
  });

  if (!restaurant) {
    throw new Error("Restaurando não encontrado");
  }

  const hash = generateHashFromEmail(input.customerEmail);

  const productsWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrice.find((p) => p.id === product.id)?.price ?? 0,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerHash: hash,
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    },
  });

  console.log(hash);

  revalidatePath(`/${input.slug}/orders`);
  redirect(`/${input.slug}/orders?customer=${hash}`);
};
