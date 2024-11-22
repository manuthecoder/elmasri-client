"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Image from "next/image";
import { useEffect, useState } from "react";
import { History } from "./History";
import { HowWasThisCreated } from "./HowWasThisCreated";
import { PwaInstaller } from "./PwaInstaller";
import { WelcomeModal } from "./WelcomeModal";
import { Icon } from "../Icon";

export function AppMenu({
  newChat,
  course,
  setCourse,
  conversationId,
  setConversationId,
  chatControl,
}: any) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        document.documentElement.classList.contains("dark")
          ? "#0a0a0a"
          : "#ffffff"
      );
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    setDarkMode(document.documentElement.classList.contains("dark"));
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        document.documentElement.classList.contains("dark")
          ? "#0a0a0a"
          : "#ffffff"
      );
  };

  return (
    <div className="flex items-center">
      <WelcomeModal />
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            style={{ paddingLeft: 5, paddingRight: 5, minWidth: 0 }}
          >
            <Image alt="Logo" src="/elmasri/1.png" width={24} height={24} />
            <Icon>expand_more</Icon>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={toggleDarkMode}>
              <Icon className="mr-2">dark_mode</Icon>
              Dark mode
              {darkMode && <Icon className="ml-auto">check</Icon>}
            </MenubarItem>
            <History
              conversationId={conversationId}
              setConversationId={setConversationId}
              chatControl={chatControl}
            />
            <HowWasThisCreated isMenu />
            <MenubarItem
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear chat history and stored data?"
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              <Icon className="mr-2">delete</Icon>
              Permanently delete my data
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            {course.split(":")[0]}
            <Icon className="ml-1">expand_more</Icon>
          </MenubarTrigger>
          <MenubarContent>
            {[
              "AP Physics 1: Algebra-Based",
              "AP Physics 2: Algebra-Based",
              "AP Physics C: Mechanics",
              "AP Physics C: Electricity and Magnetism",
            ].map((option, i) => (
              <MenubarItem
                key={option}
                onClick={() => {
                  setCourse(option);
                  newChat();
                }}
              >
                <div className="flex flex-col">
                  {option}
                  {i === 3 && (
                    <MenubarShortcut className="ml-0">
                      Not offered @ IHS
                    </MenubarShortcut>
                  )}
                </div>
                {course === option && <Icon className="ml-auto">check</Icon>}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger
            onClick={newChat}
            className="gap-1 items-center bg-gray-100 dark:bg-neutral-800 font-light"
          >
            <span className="hidden sm:flex">New chat</span>
            <Icon className="sm:ml-2">add</Icon>
          </MenubarTrigger>
        </MenubarMenu>
        <PwaInstaller />
      </Menubar>
    </div>
  );
}
