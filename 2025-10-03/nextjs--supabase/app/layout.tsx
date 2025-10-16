import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css"; // required global styles for Mantine

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Mantine color scheme script — must be inside <html> */}
      <head>
        <ColorSchemeScript />
      </head>

      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MantineProvider
            defaultColorScheme="light"
            theme={{
              primaryColor: "indigo",
              defaultRadius: "md",
            }}
          >
            {children}
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
