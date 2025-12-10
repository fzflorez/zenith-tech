import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/provider/ThemeProvider";
import Header from "@/src/components/header/Header";
import { Toaster } from "sonner";
import { CartProvider } from "@/src/context/CartContext";

export const metadata: Metadata = {
  title: "Zenith Tech",
  description: "Zenith Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
