import { db } from "@/lib/prisma";

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  return product;
};
