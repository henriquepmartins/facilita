import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facilita$",
  description: "App que facilita sua vida financeira",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="light" style={{ colorScheme: "light" }}>
        <body
          className={`flex min-h-screen items-center justify-center ${inter.className}`}
        >
          <Toaster richColors position="bottom-right" />
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
