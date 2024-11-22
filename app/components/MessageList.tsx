import { UseChatHelpers } from "ai/react";
import { Message } from "./Message";

export function MessageList({
  handleSubmit,
  messages,
  chatControl,
  course,
}: {
  handleSubmit: any;
  messages: any;
  chatControl: UseChatHelpers;
  sendMessage: any;
  course: any;
}) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {messages.map((message: any, index: any) => (
        <Message
          messageIndex={index}
          handleSubmit={handleSubmit}
          chatControl={chatControl}
          course={course}
          key={index}
          message={message}
          hideUser={
            index + 1 < messages.length &&
            messages[index + 1].role === message.role
          }
        />
      ))}
      {chatControl.isLoading && (
        <Message
          chatControl={chatControl}
          course="AP Physics 1"
          handleSubmit={handleSubmit}
          hideUser={false}
          messageIndex={0}
          message={{ role: "assistant", loading: true, content: "" }}
        />
      )}
    </div>
  );
}
