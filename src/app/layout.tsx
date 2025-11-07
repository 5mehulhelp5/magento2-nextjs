import "./globals.css";
import { App } from "@/container";
import { FullPageLoading } from "@/components";
import { ApolloWrapper } from "@/app/ApolloWrapper";
import { Footer, Header } from "@/components";

import { RootContextProvider } from "@/context/rootContextProvider";
import { Suspense } from "react";

import { Metadata, Viewport } from "next";
import { ReduxProvider } from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "ArielBath",
  description: "ARIEL Bath | Shop Bathroom Vanities, Whirlpool Bathtubs, Free Standing Bathtubs, Showers, and more.",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "/media/icons/ariel_circle_192.png",
    shortcut: "/media/icons/ariel_circle_144.png",
    apple: "/media/icons/ariel_circle_192.png",
  },
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-white"} suppressHydrationWarning>
        <ApolloWrapper>
          <ReduxProvider>
            <RootContextProvider>
              <Suspense fallback={<FullPageLoading />}>
                <Header />
                <App>{children}</App>
                <Footer />
              </Suspense>
            </RootContextProvider>
          </ReduxProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
