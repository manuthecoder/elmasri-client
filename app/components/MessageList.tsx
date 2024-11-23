import { UseChatHelpers } from "ai/react";
import { Message } from "./Message";

export function MessageList({
  handleSubmit,
  messages,
  chatControl,
  course,
  hasReachedMessageLimit,
}: {
  handleSubmit: any;
  messages: any;
  chatControl: UseChatHelpers;
  sendMessage: any;
  course: any;
  hasReachedMessageLimit: any;
}) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {[
        // insert ad at index 4
        ...messages.slice(0, 5),
        ...messages.slice(5, 6),
        messages.length > 5 &&
          !chatControl.isLoading && {
            role: "assistant",
            content: "This is an ad",
            ad: true,
          },
        ...messages.slice(6),
      ]
        .filter((e) => e)
        .map((message: any, index: any) => (
          <Message
            hasReachedMessageLimit={hasReachedMessageLimit}
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

