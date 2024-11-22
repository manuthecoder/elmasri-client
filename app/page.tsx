"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useChat } from "ai/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";
import { Markdown as TipTapMarkdown } from "tiptap-markdown";
import { AppMenu } from "./components/AppMenu";
import { EmptyContainer } from "./components/EmptyContainer";
import { ErrorComponent } from "./components/ErrorComponent";
import { MessageList } from "./components/MessageList";
import { SendMessage } from "./components/SendMessage";
import InlineMath from "./components/TextEditor/InlineMath";
import { generateRandomString } from "./generateRandomString";

dayjs.extend(relativeTime);

export default function Page() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mathematics,
      Placeholder.configure({
        placeholder: "Type your message...",
      }),
      TipTapMarkdown,
      InlineMath,
    ],
    content: ``,
    editorProps: {
      handleKeyDown: (t, e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          handleSubmit(editor?.storage?.markdown?.getMarkdown?.());
          return true;
        }
        if (e.key === "/") {
          e.preventDefault();
          document.getElementById("symbolsTrigger")?.click();
          return true;
        }
        if (e.key === "@") {
          e.preventDefault();
          document.getElementById("functionsTrigger")?.click();
          return true;
        }
      },
    },
  });

  const value = editor?.storage?.markdown?.getMarkdown?.();
  const scrollRef: any = useRef();
  const [course, setCourse] = useState<any>("AP Physics 1: Algebra-Based");

  const defaultMessages = [
    {
      role: "assistant",
      content:
        "👋 Well, hello there. I'm Mr. Elmasri 🥸 with my essence craftfully captured through the power of Artificial Intelligence 🤖",
    },
    {
      role: "assistant",
      content:
        "Sometimes I can generate inaccurate responses, so double check! I'm trained on the Official CollegeBoard AP Physics Course and Exam Descriptions, Lab Manuals, and other resources. Use this tool responsibly 📚",
    },
    {
      role: "assistant",
      content: "How can I help you with Physics today? 🫵",
    },
    {
      role: "user",
      chips: true,
    },
  ];

  const [conversationId, setConversationId] = useState<any>(
    generateRandomString(50)
  );
  // const [messages, chatControl] = useState<any>(defaultMessages);
  const chatControl = useChat({
    initialMessages: defaultMessages as any,
  });

  const { messages, append, error } = chatControl;

  useEffect(() => {
    if (typeof document !== "undefined" && typeof window !== "undefined")
      import("react-mathquill").then((mq) => {
        mq.addStyles();
      });
  }, []);

  useEffect(() => {
    const chatHistory = localStorage.getItem("chatHistory");
    const history = JSON.parse(chatHistory || "{}");
    if (messages.find((e: any) => e.role === "assistant"))
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

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({ top: 99999, behavior: "smooth" });
  };

  const newChat = () => {
    setConversationId(generateRandomString(50));
    chatControl.setMessages(defaultMessages as any);
  };

  const handleSubmit = async (
    a: string,
    messageIndex?: any,
    newData?: string
  ) => {
    if (!value.trim() && !a) return;
    if (messageIndex && newData) {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        content: newData,
      };
      chatControl.setMessages(updatedMessages);
      chatControl.reload();
    } else {
      append({ content: value, role: "user" });
    }
    editor?.commands.setContent("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <TooltipProvider>
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
            chatControl={chatControl}
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
                chatControl={chatControl}
                sendMessage={(a: any) => handleSubmit(a)}
                messages={messages}
              />
            </div>
          </div>
          {error && <ErrorComponent />}
          <SendMessage
            editor={editor}
            messages={messages}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

