import {
  getRestaurantBySlug,
  getRestaurantBySlugWithCategories,
} from "@/data/get-restaurant-by-slug";
import type { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";
import RestaurantCategories from "./components/categories";
import RestaurantMenuHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: ConsumptionMethod }>;
}

const isConsumptionMethodValid = (consumptionMethod: ConsumptionMethod) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod);
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);
  const restaurantWithCategories =
    await getRestaurantBySlugWithCategories(slug);

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  if (!restaurant) {
    return notFound();
  }

  if (!restaurantWithCategories) {
    return notFound();
  }

  return (
    <div>
      <RestaurantMenuHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurantWithCategories} />
    </div>
  );
};

export default RestaurantMenuPage;
