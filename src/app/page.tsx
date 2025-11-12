import { HomeContainer } from "@/container";
import { Metadata } from "next";

/**
 * Generate metadata for the home page
 * Uses build-time store config for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    if (process.env.STORE_CONFIG_DATA) {
      const storeConfig = JSON.parse(process.env.STORE_CONFIG_DATA);

      return {
        title: storeConfig?.default_title || storeConfig?.store_name || "ArielBath",
        description: storeConfig?.default_description || "ARIEL Bath | Shop Bathroom Vanities, Whirlpool Bathtubs, Free Standing Bathtubs, Showers, and more.",
        keywords: storeConfig?.default_keywords || "",
      };
    }
  } catch (error) {
    console.warn("Could not parse store config for metadata:", error);
  }

  // Fallback metadata
  return {
    title: "ArielBath",
    description: "ARIEL Bath | Shop Bathroom Vanities, Whirlpool Bathtubs, Free Standing Bathtubs, Showers, and more.",
  };
}

export default function Home() {
  return <HomeContainer />;
}
