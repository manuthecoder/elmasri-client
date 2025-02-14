import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { HowWasThisCreated } from "./HowWasThisCreated";
import { DysperseAd } from "./DysperseAd";
import { Icon } from "../Icon";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import dayjs from "dayjs";

const courseChips: any = {
  "AP Physics 1: Algebra-Based": [
    "What are we learning in Unit 4?",
    "What should I know for my work, energy, and power test?",
    "Give me a practice problem involving energy & kinematics",
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

export function Message({
  message,
  chatControl,
  hideUser,
  course,
  messageIndex,
  handleSubmit,
  hasReachedMessageLimit,
}: {
  message: any;
  chatControl: any;
  hideUser: boolean;
  course: string;
  messageIndex: number;
  handleSubmit: any;
  hasReachedMessageLimit: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  return (
    <div
      className="flex flex-row items-end gap-2"
      style={{ marginLeft: message.role === "assistant" ? undefined : "auto" }}
    >
      {hideUser ? (
        <div className="w-[40px] h-8 shrink-0" />
      ) : (
        <div className="w-[40px] h-[40px] shrink-0">
          {message.role === "assistant" ? (
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
      {message.role === "user" &&
        !message.chips &&
        !isEditing &&
        !hasReachedMessageLimit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 opacity-40"
                onClick={() => {
                  setIsEditing(true);
                  setEditedContent(message.content);
                }}
              >
                <Icon>edit</Icon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        )}
      <div
        className={
          `bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 py-2 max-w-lg prose prose-neutral ` +
          (message.role === "user"
            ? "prose-invert text-green-100 selection:bg-green-200 selection:text-green-900"
            : "dark:prose-invert")
        }
        style={
          message.role === "assistant"
            ? {
                borderBottomLeftRadius: !hideUser ? 0 : "1rem",
              }
            : {
                borderBottomRightRadius: !hideUser ? 0 : "1rem",
                background: message.chips ? "transparent" : "#2f7c57",
                textAlign: "right",
              }
        }
      >
        <div className="text-sm">
          {message.loading ? (
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : message.chips ? (
            <div className="flex flex-col gap-1">
              {courseChips[course].map((chip: string) => (
                <Button
                  className="ml-auto text-gray-700 dark:text-white whitespace-normal max-w-[210px] h-auto py-2 sm:max-w-full"
                  style={{ whiteSpace: "pretty" }}
                  key={chip}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (hasReachedMessageLimit) {
                      toast({
                        title: "Message Limit Exceeded",
                        description: `Try again after ${dayjs(
                          localStorage.getItem("messageResetTime")
                        ).format("h:mm A")}`,
                      });
                      return;
                    }
                    chatControl.append({ content: chip, role: "user" });
                  }}
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
          ) : message.ad ? (
            <DysperseAd />
          ) : (
            <div className="prose-sm">
              {isEditing ? (
                <div className="w-96 max-w-full flex flex-col gap-1">
                  <Textarea
                    value={editedContent}
                    autoFocus
                    style={{ height: 200, borderColor: "#fff" }}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      variant="ghost"
                      style={{
                        borderWidth: 1,
                        borderColor: "#fff",
                        background: "transparent",
                      }}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsEditing(false);
                        chatControl.setMessages(
                          chatControl.messages.map((m: any, i: number) =>
                            i === messageIndex
                              ? { ...m, content: editedContent }
                              : m
                          )
                        );
                        chatControl.reload();
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <Markdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                >
                  {message.content}
                </Markdown>
              )}
              {message.finishReason === "SAFETY" && (
                <div>
                  <span className="text-xs text-red-500 dark:text-red-400">
                    This response was flagged as potentially unsafe
                  </span>
                  <p className="m-0">
                    Sorry, I can't provide that information. Please ask me
                    something else. Error codes:
                    {message.safetyRatings &&
                      message.safetyRatings
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
      <div className="flex flex-col sm:flex-row">
        {message.role === "assistant" && messageIndex > 3 && !message.ad && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 opacity-40"
                onClick={() => window.open("https://tally.so/r/wo0vvP")}
              >
                <Icon>feedback</Icon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send feedback</TooltipContent>
          </Tooltip>
        )}
        {message.role === "assistant" &&
          messageIndex > 3 &&
          !message.ad &&
          !hasReachedMessageLimit && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 opacity-40"
                  onClick={() => chatControl.reload()}
                >
                  <Icon>refresh</Icon>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send feedback</TooltipContent>
            </Tooltip>
          )}
      </div>
    </div>
  );
}

