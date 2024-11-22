import { Message } from "./Message";

export function MessageList({
  handleSubmit,
  messages,
  chatControl,
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
    </div>
  );
}
