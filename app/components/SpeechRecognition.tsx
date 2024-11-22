import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";
import { Icon } from "../Icon";

export function SpeechRecognition({
  editor,
  handleSubmit,
}: {
  editor: any;
  handleSubmit: any;
}) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("");

        editor.commands.setContent(transcript);

        // if done
        if (event.results[0].isFinal) {
          setIsListening(false);
          recognition.stop();
          handleSubmit(event.results[0][0].transcript);
        }
      };
    } else {
      setIsListening(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={`
          ${
            isListening
              ? "bg-red-500 hover:bg-red-500 text-white"
              : "bg-gray-100 text-black dark:text-white dark:bg-neutral-800"
          } px-2`}
          onClick={handleClick}
          variant="ghost"
        >
          <Icon>{isListening ? "stop" : "mic"} </Icon>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Speak with Mr. Elmasri</TooltipContent>
    </Tooltip>
  );
}
