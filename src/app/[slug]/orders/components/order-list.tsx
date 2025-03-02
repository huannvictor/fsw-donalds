"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import type { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: { product: true };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "COMPLETED")
    return { label: "Finalizado", class: "bg-lime-400 hover:bg-lime-500" };
  if (status === "PREPARING")
    return { label: "Em preparo", class: "bg-slate-400 hover:bg-slate-500" };
  if (status === "PENDING")
    return { label: "Pendente", class: "bg-orange-400 hover:bg-orange-500" };
  return { label: "", class: "" };
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="font-semibold text-lg">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <Badge className={getStatusLabel(order.status).class}>
              {getStatusLabel(order.status).label}
            </Badge>

            <div className="flex items-center gap-2">
              <div className="relative size-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm object-contain"
                />
              </div>
              <h3 className="font-semibold text-sm">{order.restaurant.name}</h3>
            </div>

            <Separator />

            {order.orderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-slate-400 text-center text-white text-xs">
                  {orderProduct.quantity}
                </div>
                <p>{orderProduct.product.name}</p>
              </div>
            ))}

            <Separator />

            <div className="flex items-center justify-between">
              <p className="font-medium text-base">
                {formatCurrency(order.total)}
              </p>
              <div className="flex items-center gap-2">
                {order.consumptionMethod === "DINE_IN" ? (
                  <>
                    <p className="font-medium text-sm ">comer aqui</p>
                    <Image
                      src="/dine_in.png"
                      alt="comer aqui"
                      width={20}
                      height={20}
                    />
                  </>
                ) : (
                  <>
                    <p className="font-medium text-sm ">para levar</p>
                    <Image
                      src="/takeaway.png"
                      alt="para levar"
                      width={20}
                      height={20}
                    />
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
