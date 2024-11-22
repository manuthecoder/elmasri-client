import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { SpeechRecognition } from "./SpeechRecognition";
import { SymbolPicker } from "./SymbolPicker";
import { Icon } from "../Icon";
import { MessageBarContext } from "../MessageBarContext";
import { EquationEditor } from "./EquationEditor";

export function SendMessage({ editor, messages, handleSubmit }: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editor) setTimeout(() => editor.view.dom.focus(), 100);
  }, [editor]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (
        editor &&
        !e.ctrlKey &&
        !["TEXTAREA", "INPUT"].includes(
          document?.activeElement?.tagName || "-1"
        ) &&
        !document.querySelector("[contenteditable=true]:focus") &&
        !document.querySelector("textarea:focus") &&
        !document.querySelector("input:focus")
      ) {
        e.preventDefault();
        editor.view.dom.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor]);

  const value = editor?.storage?.markdown?.getMarkdown?.();

  if (!editor) {
    return null;
  }

  return (
    <MessageBarContext.Provider value={{ setOpen }}>
      <div className="flex gap-2" style={{ minHeight: 38 }}>
        {!value && (
          <SpeechRecognition handleSubmit={handleSubmit} editor={editor} />
        )}
        <SymbolPicker editor={editor} />
        <EquationEditor editor={editor} />
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent
            align="start"
            className="prose dark:prose-invert p-2 w-full"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {[
              { key: "Enter", description: "Exit equation mode" },
              { divider: true },
              { key: "_", description: "Subscript" },
              { key: "/", description: "Fraction" },
              { key: "^", description: "Exponent" },
              { key: "*", description: "Multiplication" },
              { key: "sqrt", description: "Square root" },
            ].map((item) =>
              item.divider ? (
                <div className="border-b mb-2" key={Math.random()} />
              ) : (
                <div
                  className="text-xs mb-2 flex items-center gap-4"
                  key={item.description}
                >
                  <span className="mr-auto">{item.description}</span>
                  <kbd>{item.key}</kbd>
                </div>
              )
            )}
          </PopoverContent>
          <PopoverTrigger asChild>
            <div onClick={(e) => e.stopPropagation()} className="flex-1">
              <EditorContent
                autoFocus
                onClick={(e) => e.stopPropagation()}
                className="flex overflow-y-scroll w-full flex-1 bg-neutral-50 dark:bg-neutral-950 rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                editor={editor}
                spellCheck={false}
                style={{ minHeight: 38, maxHeight: 100 }}
              />
            </div>
          </PopoverTrigger>
        </Popover>
        <Button
          style={{ height: 38 }}
          className="px-2 sm:px-4"
          onClick={() => handleSubmit(value)}
          disabled={
            Boolean(messages.find((t: any) => t.loading)) || !value?.trim()
          }
        >
          <span className="hidden sm:visible">Send</span>
          <Icon>send</Icon>
        </Button>
      </div>
    </MessageBarContext.Provider>
  );
}

