"use client";
import { HomeContainer } from "@/container";

export default function Home() {
  const homeBanner = null;
  const topSales = null;
  const newArrivals = null;
  const hotSales = null;

  return (
    <HomeContainer ssrData={{ homeBanner, topSales, newArrivals, hotSales }} />
  );
}
