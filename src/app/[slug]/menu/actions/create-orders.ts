"use server";

import { db } from "@/lib/prisma";
import type { ConsumptionMethod } from "@prisma/client";
import { RemoveCPFPunctuation } from "../helpers/cpf";

interface CreateOrderInputProps {
  customerName: string;
  customerCpf: string;
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
      customerCpf: RemoveCPFPunctuation(input.customerCpf),
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
};
