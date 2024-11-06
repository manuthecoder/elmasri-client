"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

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
      <p className="text-xl font-extrabold">ElmasriAI</p>
      <Badge variant="outline">
        <Icon style={{ fontSize: 15, marginRight: 5 }}>science</Icon>{" "}
        Experimental
      </Badge>
    </div>
  );
}

function Message({ from, content, hideUser, isSameUserAsPrevious }: any) {
  return (
    <div className="flex flex-row items-end gap-2">
      {hideUser ? (
        <div className="w-8 h-8 shrink-0" />
      ) : (
        <div className="w-8 h-8">
          {from === "AI" ? (
            <Image
              alt="ElmasriAI"
              src="/elmasri/1.png"
              width={150}
              height={150}
              className="mx-auto"
            />
          ) : (
            <Image
              alt="ElmasriAI"
              src="/elmasri/1.png"
              width={150}
              height={150}
              className="mx-auto"
            />
          )}
        </div>
      )}
      <div
        className="bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 py-2 max-w-lg"
        style={{
          borderBottomLeftRadius: !hideUser ? 0 : "1rem",
        }}
      >
        <p className="text-sm">{content}</p>
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

function SendMessage({ value, setValue, handleSubmit, setMessages }) {
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
        rows={1}
        ref={inputRef}
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
      />
      <Button className="ml-2" onClick={handleSubmit}>
        Send
        <Icon>send</Icon>
      </Button>
    </div>
  );
}

export default function Page() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log(value);
    setValue("");
  };

  const [messages, setMessages] = useState([
    {
      from: "AI",
      content:
        "Well, hello there. I'm Mr. Elmasri, with my essence craftfully captured through Artificial Intelligence.",
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

  return (
    <div className="h-screen w-screen flex flex-col max-h-full items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col h-screen py-10">
        <ScrollArea className="flex-1 gap-1 flex-1 mb-2 rounded-md border p-4">
          <EmptyContainer />
          <div className="flex-1 bg-red-500" />
          <MessageList messages={messages} />
        </ScrollArea>

        <SendMessage
          value={value}
          setValue={setValue}
          setMessages={setMessages}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
