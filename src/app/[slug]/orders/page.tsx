import { db } from "@/lib/prisma";
import CustomerEmailForm from "./components/email-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ customer: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { customer } = await searchParams;
  if (!customer) {
    return <CustomerEmailForm />;
  }

  const customerHash = customer;

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerHash,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrderList orders={orders} />;
};

export default OrdersPage;
