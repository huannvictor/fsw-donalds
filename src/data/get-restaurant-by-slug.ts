import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  return restaurant;
};

export const getRestaurantBySlugWithCategories = async (slug: string) => {
  const restaurantWithCategories = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  return restaurantWithCategories;
};
