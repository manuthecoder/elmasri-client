import { MenubarItem, MenubarShortcut } from "@/components/ui/menubar";
import {
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@radix-ui/react-menubar";
import { UseChatHelpers } from "ai/react";
import dayjs from "dayjs";
import { Icon } from "../Icon";

export function History({
  conversationId,
  setConversationId,
  chatControl,
}: {
  conversationId: any;
  setConversationId: any;
  chatControl: UseChatHelpers;
}) {
  return (
    <>
      <MenubarSub>
        <MenubarSubTrigger className="items-center py-2 hover:bg-gray-100 rounded dark:hover:bg-neutral-800 outline-none cursor-default flex gap-2 px-2 text-sm">
          <Icon>history</Icon>
          Chat history
          <Icon className="ml-auto">arrow_forward_ios</Icon>
        </MenubarSubTrigger>
        <MenubarSubContent className="shadow-lg bg-white dark:bg-neutral-950 border rounded w-52 p-1 max-h-52 overflow-y-auto">
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
                  chatControl.setMessages(value.messages);
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

