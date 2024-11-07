"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import Markdown from "react-markdown";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import the Katex CSS file

function EmptyContainer() {
  return (
    <div className="flex flex-col items-center justify-center mb-2 gap-2 py-14">
      <div>
        <Image
          alt="Elmasri"
          src="/elmasri/1.png"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
      <div className="text-xl font-extrabold flex items-center gap-2">
        ElmasriAI{" "}
        <Badge variant="outline">
          <Icon style={{ fontSize: 15, marginRight: 5 }}>science</Icon>{" "}
          Experimental
        </Badge>
      </div>
      <p className="text-xs opacity-60">
        A project by{" "}
        <a href="https://manu.is-a.dev" className="underline" target="_blank">
          @heyitsmanug
        </a>
        <Icon style={{ fontSize: 15, verticalAlign: "middle", marginLeft: 5 }}>
          favorite
        </Icon>
      </p>
    </div>
  );
}

function Message({
  from,
  loading,
  content,
  hideUser,
  isSameUserAsPrevious,
}: any) {
  return (
    <div
      className="flex flex-row items-end gap-2"
      style={{ marginLeft: from === "AI" ? undefined : "auto" }}
    >
      {hideUser ? (
        <div className="w-[40px] h-8 shrink-0" />
      ) : (
        <div className="w-[40px] h-[40px]">
          {from === "AI" ? (
            <Image
              alt="ElmasriAI"
              src="/elmasri/1.png"
              width={150}
              height={150}
              className="mx-auto"
            />
          ) : (
            <></>
          )}
        </div>
      )}
      <div
        className={
          "bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 py-2 max-w-lg prose prose-neutral " +
          (from === "USER" ? "prose-invert" : "dark:prose-invert")
        }
        style={
          from === "AI"
            ? {
                borderBottomLeftRadius: !hideUser ? 0 : "1rem",
              }
            : {
                borderBottomRightRadius: !hideUser ? 0 : "1rem",
                background: "#2f7c57",
              }
        }
      >
        <div className="text-sm">
          {loading ? (
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className="prose-sm">
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {content}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {messages.map((message, index) => (
        <Message
          key={index}
          {...message}
          hideUser={
            index + 1 < messages.length &&
            messages[index + 1].from === message.from
          }
          isSameUserAsPrevious={
            index > 0 && messages[index - 1].from === message.from
          }
        />
      ))}
    </div>
  );
}

function SendMessage({ value, messages, setValue, handleSubmit }) {
  const inputRef = useRef();

  useEffect(() => {
    const input: any = inputRef.current;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }, [inputRef, value]);

  return (
    <div className="flex">
      <Textarea
        style={{ minHeight: 10, maxHeight: 100 }}
        className="bg-neutral-50 dark:bg-neutral-950"
        rows={1}
        ref={inputRef}
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Button
        className="ml-2"
        onClick={handleSubmit}
        disabled={Boolean(messages.find((t) => t.loading)) || !value?.trim()}
      >
        Send
        <Icon>send</Icon>
      </Button>
    </div>
  );
}

export function AppMenu() {
  return (
    <div className="flex items-center">
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
          <MenubarTrigger>
            AP Physics 1<Icon className="ml-1">expand_more</Icon>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              AP Physics 1: Algebra-Based <Icon className="ml-auto">check</Icon>
            </MenubarItem>
            <MenubarItem>AP Physics C: Mechanics</MenubarItem>
            <MenubarItem>AP Physics 2: Algebra-Based</MenubarItem>

            <MenubarItem>
              <div className="flex flex-col">
                AP Physics C: Electricity and Magnetism
                <MenubarShortcut className="ml-0">
                  Not offered @ IHS
                </MenubarShortcut>
              </div>
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

export default function Page() {
  const scrollRef: any = useRef();

  const [value, setValue] = useState<any>("");
  const [messages, setMessages] = useState<any>([
    {
      from: "AI",
      content:
        "Well, hello there. I'm Mr. Elmasri, with my essence craftfully captured through the power of Artificial Intelligence.",
    },
    {
      from: "AI",
      content:
        "Sometimes I can generate inaccurate responses, so double check! As always, please use this tool with academic integrity :)",
    },
    {
      from: "AI",
      content: "How can I help you with Physics today?",
    },
  ]);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setMessages([
      ...messages,
      { from: "USER", content: value },
      { from: "AI", loading: true },
    ]);

    await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { from: "USER", content: value }]),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessages([
          ...messages,
          { from: "USER", content: value },
          { from: "AI", content: res.message },
        ]);
      })
      .catch((err) => {
        console.error(err);
        setMessages([
          ...messages,
          { from: "USER", content: value },
          {
            from: "AI",
            error: true,
            content:
              "Yikes! Something went wrong. Most likely, I might be in high demand, but I've reported the error to Manu. Try again later.",
          },
        ]);
      });
    setValue("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col max-h-full items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col h-screen p-5">
        <AppMenu />
        <ScrollArea className="gap-1 flex-1 my-2 rounded-md border bg-white dark:bg-neutral-950">
          <div className="p-4">
            <EmptyContainer />
            <div className="flex-1 bg-red-500" />
            <MessageList messages={messages} />
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <SendMessage
          value={value}
          messages={messages}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
