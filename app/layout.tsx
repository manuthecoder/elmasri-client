import type { Metadata } from "next";
import "./globals.css";
import "./typing.css";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Icon } from "./Icon";

export function AppMenu() {
  return (
    <div className="fixed top-0 left-0 m-4 z-10">
      <Menubar className="shadow-lg">
        <MenubarMenu>
          <MenubarTrigger>
            <span style={{ fontWeight: 700 }}>ElmasriAI</span>
            <Icon className="ml-1">expand_more</Icon>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="gap-1 items-center bg-gray-100 dark:bg-neutral-800 font-light">
            New chat
            <Icon className="ml-2">add</Icon>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

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
      </head>
      <body className={`antialiased`}>
        <AppMenu />
        {children}
      </body>
    </html>
  );
}
