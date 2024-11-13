import { Analytics } from "@vercel/analytics/react";
import dayjs from "dayjs";
import type { Metadata, Viewport } from "next";
import "./globals.scss";
import "./typing.css";
import relativeTime from "dayjs/plugin/relativeTime";
import MathLoader from "./MathLoader";
import { Toaster } from "@/components/ui/toaster";
dayjs.extend(relativeTime);

const APP_NAME = "ElmasriAI";
const APP_DEFAULT_TITLE = "ElmasriAI";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION =
  "AI-powered Mr. Elmasri. How can I help you with AP Physics today?";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    images: ["https://elmasri.my.to/og.png"],
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh overflow-hidden dark:bg-black">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <meta name="interactive-widget" content="resizes-content" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`antialiased`}>
        <Analytics />
        <MathLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

