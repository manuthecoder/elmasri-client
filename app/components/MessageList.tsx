import { UseChatHelpers } from "ai/react";
import { Message } from "./Message";

export function MessageList({
  handleSubmit,
  messages,
  chatControl,
  sendMessage,
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
          messages={messages}
          messageIndex={index}
          handleSubmit={handleSubmit}
          chatControl={chatControl}
          course={course}
          sendMessage={sendMessage}
          key={index}
          message={message}
          hideUser={
            index + 1 < messages.length &&
            messages[index + 1].role === message.role
          }
        />
      ))}
      {chatControl.isLoading && (
        <Message message={{ role: "assistant", loading: true, content: "" }} />
      )}
    </div>
  );
}
