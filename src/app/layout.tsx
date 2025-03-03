import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "./[slug]/menu/contexts/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW Donalds",
  description: "O melhor fast food do mundo",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} flex flex-col items-center justify-center antialiased`}
      >
        <CartProvider>
          <div className="h-full w-full sm:w-[390px]">{children}</div>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
