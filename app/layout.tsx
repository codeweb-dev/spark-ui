import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG } from "@/lib/constants";
import { InteractivePets } from "@/registry/spark-ui/interactive-pets";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.authorUrl }],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    codeRepository: SITE_CONFIG.github,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.author,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <InteractivePets
            pets={[
              {
                id: "cat",
                name: "Mochi",
                initialPosition: { x: 0, y: 0 },
                idleMessage: [
                  "Interactive Pets is now in beta!",
                  "New this version: pets roam the whole site.",
                  "Drag me around and try my food bowl.",
                  "Click me anytime for release updates.",
                ],
                fedMessage: "Thanks for testing the beta!",
              },
            ]}
            showInstructions={false}
            className="pointer-events-none fixed inset-0 z-40 **:data-food-controls:inset-x-auto **:data-food-controls:top-24 **:data-food-controls:bottom-auto **:data-food-controls:left-[calc(50%+1rem)] **:data-pet-actor:top-24 **:data-pet-actor:left-[calc(50%-5rem)] :left-[calc(50%-5rem)]"
            playgroundClassName="h-dvh rounded-none border-0 bg-transparent sm:h-dvh"
          />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
