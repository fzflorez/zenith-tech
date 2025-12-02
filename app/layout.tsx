import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/provider/ThemeProvider";

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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
