"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Icon } from "./Icon";

import "katex/dist/katex.min.css"; // Import the Katex CSS file
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

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
  chips,
  from,
  sendMessage,
  loading,
  content,
  hideUser,
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
              className="mx-auto shrink-0"
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
                background: chips ? "transparent" : "#2f7c57",
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
          ) : chips ? (
            <div className="flex flex-col gap-1">
              {chips.map((chip: string) => (
                <Button
                  className="ml-auto text-gray-700 dark:text-white"
                  key={chip}
                  size="sm"
                  variant="outline"
                  onClick={() => sendMessage(chip)}
                >
                  <Icon style={{ fontSize: 20, marginBottom: -2 }}>
                    emoji_objects
                  </Icon>
                  {chip}
                </Button>
              ))}
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

function MessageList({ messages, sendMessage }: any) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {messages.map((message: any, index: any) => (
        <Message
          sendMessage={sendMessage}
          key={index}
          {...message}
          hideUser={
            index + 1 < messages.length &&
            messages[index + 1].from === message.from
          }
        />
      ))}
    </div>
  );
}

function SendMessage({
  inputRef,
  value,
  messages,
  setValue,
  handleSubmit,
}: any) {
  useEffect(() => {
    const input: any = inputRef.current;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }, [inputRef, value]);

  return (
    <div className="flex" style={{ minHeight: 38 }}>
      <Textarea
        style={{ minHeight: 38, maxHeight: 100 }}
        className="bg-neutral-50 dark:bg-neutral-950"
        rows={1}
        ref={inputRef as any}
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
        style={{ height: 38 }}
        onClick={handleSubmit}
        disabled={
          Boolean(messages.find((t: any) => t.loading)) || !value?.trim()
        }
      >
        Send
        <Icon>send</Icon>
      </Button>
    </div>
  );
}

function AppMenu({ newChat, course, setCourse }: any) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  return (
    <div className="flex items-center">
      <Menubar className="shadow-lg">
        <MenubarMenu>
          <MenubarTrigger
            style={{ paddingLeft: 5, paddingRight: 5, minWidth: 0 }}
          >
            <Image alt="Logo" src="/elmasri/1.png" width={24} height={24} />
            <Icon>expand_more</Icon>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={toggleDarkMode}>
              Dark mode
              {darkMode && <Icon className="ml-auto">check</Icon>}
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
              "AP Physics C: Mechanics",
              "AP Physics 2: Algebra-Based",
              "AP Physics C: Electricity and Magnetism",
            ].map((option, i) => (
              <MenubarItem key={option} onClick={() => setCourse(option)}>
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
            New chat
            <Icon className="ml-2">add</Icon>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

const courseChips = {
  "AP Physics 1: Algebra-Based": [
    "How to determine the net force in a system?",
    "What should I know for my circular motion/gravitation test?",
    "Give me a practice problem involving circular motion & kinematics",
  ],
  "AP Physics C: Mechanics": [
    "How do you solve problems involving rotational motion?",
    "What’s the relationship between torque and angular acceleration?",
    "Can you show a practice problem on conservation of angular momentum?",
  ],
  "AP Physics 2: Algebra-Based": [
    "How does pressure change with depth in a fluid?",
    "What’s the difference between resistors in series and parallel?",
    "Explain Ohm's law",
  ],
  "AP Physics C: Electricity and Magnetism": [
    "How do electric fields relate to potential energy?",
    "How do I solve problems with capacitors in circuits?",
    "Can you go over a practice problem involving Gauss’s Law?",
  ],
};

export default function Page() {
  const inputRef = useRef();
  const scrollRef: any = useRef();

  const [value, setValue] = useState<any>("");
  const [course, setCourse] = useState<any>("AP Physics 1: Algebra-Based");

  const defaultMessages = [
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
    {
      from: "USER",
      chips: courseChips[course],
    },
  ];

  const [messages, setMessages] = useState<any>(defaultMessages);

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({ top: 99999, behavior: "smooth" });
  };

  const handleSubmit = async (a: string) => {
    if (!value.trim() && !a) return;
    setMessages(
      [
        ...messages,
        { from: "USER", content: a || value },
        { from: "AI", loading: true },
      ].filter((e) => !e.chips)
    );

    await fetch(
      process.env.NODE_ENV === "production"
        ? "https://elmasri-client.vercel.app/api"
        : "/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          messages: [...messages, { from: "USER", content: a || value }].filter(
            (e) => !e.chips
          ),
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessages([
          ...messages,
          { from: "USER", content: a || value },
          { from: "AI", content: res.message },
        ]);
      })
      .catch((err) => {
        console.error(err);
        setMessages([
          ...messages,
          { from: "USER", content: a || value },
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
    <div className="h-screen flex flex-col max-h-full items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col h-screen p-5">
        <AppMenu
          course={course}
          setCourse={setCourse}
          newChat={() => {
            setMessages(defaultMessages);
          }}
        />
        <div
          ref={scrollRef}
          className="overflow-y-scroll gap-1 flex-1 my-2 rounded-md border bg-white dark:bg-neutral-950"
        >
          <div className="p-4">
            <EmptyContainer />
            <div className="flex-1 bg-red-500" />
            <MessageList
              sendMessage={(a: any) => handleSubmit(a)}
              messages={messages}
            />
          </div>
        </div>
        <SendMessage
          inputRef={inputRef}
          value={value}
          messages={messages}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
