import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/provider/ThemeProvider";
import Header from "@/src/components/header/Header";

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
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
