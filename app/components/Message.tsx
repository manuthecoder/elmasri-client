import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "katex/dist/katex.min.css";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { Icon } from "../Icon";
import { DysperseAd } from "./DysperseAd";
import { HowWasThisCreated } from "./HowWasThisCreated";

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
}: {
  message: any;
  chatControl: any;
  hideUser: boolean;
  course: string;
  messageIndex: number;
  handleSubmit: any;
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
      {message.role === "user" && !message.chips && !isEditing && (
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
          (message.role === "user"
            ? "prose-invert text-green-100"
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
                  onClick={() =>
                    chatControl.append({ content: chip, role: "user" })
                  }
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
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false);
                      handleSubmit(editedContent, messageIndex, editedContent);
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Markdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
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
    </div>
  );
}
