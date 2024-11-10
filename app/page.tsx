"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Textarea } from "@/components/ui/textarea";
import {
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@radix-ui/react-menubar";
import "katex/dist/katex.min.css"; // Import the Katex CSS file
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { usePWAInstall } from "react-use-pwa-install";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Icon } from "./Icon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { generateRandomString } from "./generateRandomString";
import { DysperseAd } from "./DysperseAd";
dayjs.extend(relativeTime);

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
        <a
          href="https://click.dysperse.com/XpY4XBi"
          className="underline"
          target="_blank"
        >
          @heyitsmanug
        </a>
        <Icon style={{ fontSize: 15, verticalAlign: "middle", marginLeft: 5 }}>
          favorite
        </Icon>
      </p>
    </div>
  );
}

function HowWasThisCreated({ isMenu }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isMenu ? (
          <Button
            variant="ghost"
            style={{ height: 30 }}
            className="px-2 w-full cursor-default transition-none gap-1 font-light"
          >
            <Icon className="mr-2">info</Icon>
            About
            <MenubarShortcut>v0.1.0</MenubarShortcut>
          </Button>
        ) : (
          <Button
            className="ml-auto text-gray-700 dark:text-white whitespace-normal max-w-[210px] h-auto py-2 sm:max-w-full"
            style={{ whiteSpace: "pretty" }}
            size="sm"
            variant="outline"
          >
            <Icon style={{ fontSize: 20, marginBottom: -2 }} className="hidden">
              favorite
            </Icon>
            How was this project created?
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>A bit about this project...</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hey there, I'm Manu, the person behind this fun project. As a student
          who finds AP physics challenging, I built this tool to help students
          like me
          <br />
          <Button
            className="mt-2 mb-5"
            style={{
              backgroundColor: "#0077B5",
              color: "#fff",
            }}
            onClick={() => window.open("https://click.dysperse.com/KUkaLrn")}
          >
            LinkedIn
          </Button>
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            Other projects?
          </span>
          <br />
          <span>
            Check out other cool stuff I've built on{" "}
            <a
              href="https://click.dysperse.com/XpY4XBi"
              target="_blank"
              className="underline"
            >
              my website
            </a>
          </span>
          <br />
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            How does this project run?
          </span>
          <br />
          <span>
            This project is built using Next.js, Vercel, and a custom AI
            infrastructure backend. The AI model is built using Google's Gemini
            model and is fine-tuned on AP Physics content.
          </span>
          <br />
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            How's this any different from ChatGPT?
          </span>
          <br />
          <span>
            ChatGPT is a general-purpose conversational AI model. This model is
            specifically trained on AP Physics content and is more likely to
            provide accurate and relevant responses to your questions. It's also
            trained using the Official CollegeBoard AP Physics Course and Exam
            Descriptions, Lab Manuals, and other resources.
          </span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function Message({
  ad,
  chips,
  from,
  sendMessage,
  loading,
  content,
  hideUser,
  course,
  messages,
  finishReason,
  safetyRatings,
  messageIndex,
  setMessages,
  handleSubmit,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div
      className="flex flex-row items-end gap-2"
      style={{ marginLeft: from === "AI" ? undefined : "auto" }}
    >
      {hideUser ? (
        <div className="w-[40px] h-8 shrink-0" />
      ) : (
        <div className="w-[40px] h-[40px] shrink-0">
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
      {from === "USER" && !chips && !isEditing && (
        <Button
          variant="ghost"
          className="px-0 opacity-40"
          onClick={() => setIsEditing(true)}
        >
          <Icon>edit</Icon>
        </Button>
      )}
      <div
        className={
          `bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 py-2 max-w-lg prose prose-neutral ` +
          (from === "USER"
            ? "prose-invert text-green-100"
            : "dark:prose-invert")
        }
        style={
          from === "AI"
            ? {
                borderBottomLeftRadius: !hideUser ? 0 : "1rem",
              }
            : {
                borderBottomRightRadius: !hideUser ? 0 : "1rem",
                background: chips ? "transparent" : "#2f7c57",
                textAlign: "right",
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
              {courseChips[course].map((chip: string) => (
                <Button
                  className="ml-auto text-gray-700 dark:text-white whitespace-normal max-w-[210px] h-auto py-2 sm:max-w-full"
                  style={{ whiteSpace: "pretty" }}
                  key={chip}
                  size="sm"
                  variant="outline"
                  onClick={() => sendMessage(chip)}
                >
                  <Icon
                    style={{ fontSize: 20, marginBottom: -2 }}
                    className="hidden"
                  >
                    emoji_objects
                  </Icon>
                  {chip}
                </Button>
              ))}
              <HowWasThisCreated />
            </div>
          ) : ad ? (
            <DysperseAd />
          ) : (
            <div className="prose-sm">
              {isEditing ? (
                <div className="w-96 max-w-full flex flex-col gap-1">
                  <Textarea
                    value={editedContent}
                    autoFocus
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false);
                      handleSubmit(editedContent, messageIndex);
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Markdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {content}
                </Markdown>
              )}
              {finishReason === "SAFETY" && (
                <div>
                  <span className="text-xs text-red-500 dark:text-red-400">
                    This response was flagged as potentially unsafe
                  </span>
                  <p className="m-0">
                    Sorry, I can't provide that information. Please ask me
                    something else. Error codes:{" "}
                    {safetyRatings &&
                      safetyRatings
                        .filter(
                          (rating: any) =>
                            !["NEGLIGIBLE"].includes(rating.probability)
                        )
                        .map((rating: any) => rating.category)
                        .join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageList({
  handleSubmit,
  messages,
  setMessages,
  sendMessage,
  course,
}: any) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {messages.map((message: any, index: any) => (
        <Message
          messages={messages}
          messageIndex={index}
          handleSubmit={handleSubmit}
          setMessages={setMessages}
          course={course}
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
        onClick={() => handleSubmit(value)}
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

function PwaInstaller() {
  const install = usePWAInstall();

  return (
    install && (
      <MenubarMenu>
        <MenubarTrigger
          onClick={install}
          className="gap-1 items-center bg-gray-100 dark:bg-neutral-800 font-light"
        >
          <span className="hidden sm:flex">Install app</span>
          <Icon className="sm:ml-2">download</Icon>
        </MenubarTrigger>
      </MenubarMenu>
    )
  );
}

function History({
  conversationId,
  setConversationId,
  setMessages,
}: {
  conversationId: any;
  setConversationId: any;
  setMessages: any;
}) {
  return (
    <>
      <MenubarSub>
        <MenubarSubTrigger className="items-center py-2 hover:bg-gray-100 rounded dark:hover:bg-neutral-800 outline-none cursor-default flex gap-2 px-2 text-sm">
          <Icon>history</Icon>
          Chat history
          <Icon className="ml-auto">arrow_forward_ios</Icon>
        </MenubarSubTrigger>
        <MenubarSubContent className="shadow-lg bg-white dark:bg-neutral-950 border rounded w-52 p-1">
          <MenubarItem
            className="gap-1"
            onClick={() => {
              if (confirm("Are you sure you want to clear chat history?"))
                localStorage.removeItem("chatHistory");
            }}
          >
            Clear
            <Icon className="ml-auto">delete</Icon>
          </MenubarItem>
          {localStorage.getItem("chatHistory") &&
            Object.entries(
              JSON.parse(localStorage.getItem("chatHistory") as any)
            ).map(([key, value]: any) => (
              <MenubarItem
                style={{ maxWidth: 200 }}
                key={key}
                onClick={() => {
                  setConversationId(value.conversationId);
                  setMessages(value.messages);
                }}
              >
                <div>
                  <div>{dayjs(value.updatedAt).fromNow()}</div>
                  <MenubarShortcut>
                    <span className="truncate">
                      {value.course.split(":")[0]}
                    </span>
                  </MenubarShortcut>
                </div>

                {conversationId === value.conversationId && (
                  <Icon className="ml-auto">check</Icon>
                )}
              </MenubarItem>
            ))}
        </MenubarSubContent>
      </MenubarSub>
    </>
  );
}

function AppMenu({
  newChat,
  course,
  setCourse,
  conversationId,
  setConversationId,
  setMessages,
}: any) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
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
              setMessages={setMessages}
            />
            <HowWasThisCreated isMenu />
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

const courseChips: any = {
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
        "👋 Well, hello there. I'm Mr. Elmasri 🥸 with my essence craftfully captured through the power of Artificial Intelligence 🤖",
    },
    {
      from: "AI",
      content:
        "Sometimes I can generate inaccurate responses, so double check! I'm trained on the Official CollegeBoard AP Physics Course and Exam Descriptions, Lab Manuals, and other resources. Use this tool responsibly 📚",
    },
    {
      from: "AI",
      content: "How can I help you with Physics today? 🫵",
    },
    {
      from: "USER",
      chips: true,
    },
  ];

  const [conversationId, setConversationId] = useState<any>(
    generateRandomString(50)
  );
  const [messages, setMessages] = useState<any>(defaultMessages);

  useEffect(() => {
    const chatHistory = localStorage.getItem("chatHistory");
    const history = JSON.parse(chatHistory || "{}");
    if (messages.find((e: any) => e.from === "USER" && !e.chips))
      localStorage.setItem(
        "chatHistory",
        JSON.stringify({
          ...history,
          [conversationId]: {
            course,
            updatedAt: new Date().toISOString(),
            conversationId,
            messages: messages,
          },
        })
      );
  }, [messages, conversationId]);

  useEffect(() => {
    (inputRef.current as any)?.focus();
  }, [messages]);

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({ top: 99999, behavior: "smooth" });
  };

  const newChat = () => {
    setConversationId(generateRandomString(50));
    setMessages(defaultMessages);
    setValue("");
  };

  const handleSubmit = async (a: string, messageIndex?: any) => {
    if (!value.trim() && !a) return;
    setMessages(
      messageIndex
        ? [
            ...messages.slice(0, messageIndex),
            { from: "USER", content: a || value },
            { from: "AI", loading: true },
          ]
        : [
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
          messages: messageIndex
            ? [
                ...messages.slice(0, messageIndex),
                { from: "USER", content: a || value },
              ].filter((e) => !e.chips && !e.ad)
            : [...messages, { from: "USER", content: a || value }].filter(
                (e) => !e.chips && !e.ad
              ),
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setMessages(
          messageIndex
            ? [
                ...messages.slice(0, messageIndex),
                { from: "USER", content: a || value },
                {
                  from: "AI",
                  content: res.message,
                  finishReason: res.finishReason,
                  safetyRatings: res.safetyRatings,
                },
                ...(!messages.find((e: any) => e.ad)
                  ? [{ from: "AI", ad: true, content: res.ad }]
                  : []),
              ]
            : [
                ...messages,
                { from: "USER", content: a || value },
                {
                  from: "AI",
                  content: res.message,
                  finishReason: res.finishReason,
                  safetyRatings: res.safetyRatings,
                },
                ...(!messages.find((e: any) => e.ad)
                  ? [{ from: "AI", ad: true, content: res.ad }]
                  : []),
              ]
        );
      })
      .catch((err) => {
        console.error(err);
        setMessages(
          messageIndex
            ? messages
            : [
                ...messages,
                { from: "USER", content: a || value },
                {
                  from: "AI",
                  error: true,
                  content:
                    "Yikes! Something went wrong. Most likely, I might be in high demand, but I've reported the error to Manu. Try again later.",
                },
              ]
        );
      });
    setValue("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="h-dvh flex flex-col max-h-full items-center justify-center"
      style={{
        ["WebkitAppRegion" as any]: "drag",
      }}
    >
      <div
        className="w-full max-w-4xl flex flex-col h-dvh p-5"
        style={{
          ["WebkitAppRegion" as any]: "no-drag",
        }}
      >
        <AppMenu
          course={course}
          setCourse={setCourse}
          newChat={newChat}
          conversationId={conversationId}
          setConversationId={setConversationId}
          setMessages={setMessages}
        />
        <div
          ref={scrollRef}
          className="overflow-y-scroll gap-1 flex-1 my-2 rounded-md border bg-white dark:bg-neutral-950"
        >
          <div className="p-4">
            <EmptyContainer />
            <div className="flex-1 bg-red-500" />
            <MessageList
              handleSubmit={handleSubmit}
              course={course}
              setMessages={setMessages}
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

