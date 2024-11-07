import type { Metadata } from "next";
import "./globals.css";
import "./typing.css";
export const metadata: Metadata = {
  title: "ElmasriAI",
  description: "How can I help you with AP Physics today?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,200,0,0"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
