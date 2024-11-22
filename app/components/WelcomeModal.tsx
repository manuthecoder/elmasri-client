import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Icon } from "../Icon";

export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("welcomeModal")) {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hidden" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What's new in v1.0.5</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className="prose dark:prose-invert">
          <div>
            {[
              {
                icon: "mic",
                text: "Call Mr. Elmasri!",
                description:
                  "Too lazy to type? Click the mic icon to start speaking and click it again to stop.",
              },
              {
                icon: "function",
                text: "Insert equations",
                description: "Press @ to quickly add formulas & more",
              },
              {
                icon: "special_character",
                text: "Insert special characters",
                description:
                  "Type / to insert special characters like Greek letters",
              },
              {
                icon: "history",
                text: "Chat history",
                description:
                  "Access chat history & continue previous conversations",
              },
            ].map(({ icon, text, description }) => (
              <span className="flex gap-4 items-center" key={text}>
                <span className="flex shrink-0 items-center justify-center w-10 h-10 bg-neutral-300 dark:bg-neutral-800 rounded-full">
                  <Icon className="text-black dark:text-white">{icon}</Icon>
                </span>
                <span>
                  <h4>{text}</h4>
                  <p>{description}</p>
                </span>
              </span>
            ))}
            <Button
              className="mt-2 w-full"
              onClick={() => {
                localStorage.setItem("welcomeModal", "true");
                setOpen(false);
              }}
            >
              Awesome!
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
