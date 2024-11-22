import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenubarShortcut } from "@/components/ui/menubar";
import { Icon } from "../Icon";

export function HowWasThisCreated({ isMenu }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isMenu ? (
          <Button
            variant="ghost"
            style={{ height: 30 }}
            className="px-2 w-full cursor-default transition-none gap-1 font-light"
          >
            <Icon className="mr-2">info</Icon>
            About
            <MenubarShortcut>v0.1.0</MenubarShortcut>
          </Button>
        ) : (
          <Button
            className="ml-auto text-gray-700 dark:text-white whitespace-normal max-w-[210px] h-auto py-2 sm:max-w-full"
            style={{ whiteSpace: "pretty" }}
            size="sm"
            variant="outline"
          >
            <Icon style={{ fontSize: 20, marginBottom: -2 }} className="hidden">
              favorite
            </Icon>
            How was this project created?
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>A bit about this project...</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hey there, I'm Manu, the person behind this fun project. As a student
          who finds AP physics challenging, I built this tool to help students
          like me
          <br />
          <Button
            className="mt-2 mb-5"
            style={{
              backgroundColor: "#0077B5",
              color: "#fff",
            }}
            onClick={() => window.open("https://click.dysperse.com/KUkaLrn")}
          >
            LinkedIn
          </Button>
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            Other projects?
          </span>
          <br />
          <span>
            Check out other cool stuff I've built on{" "}
            <a
              href="https://click.dysperse.com/XpY4XBi"
              target="_blank"
              className="underline"
            >
              my website
            </a>
          </span>
          <br />
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            How does this project run?
          </span>
          <br />
          <span>
            This project is built using Next.js, Vercel, and a custom AI
            infrastructure backend. The AI model is built using Google's Gemini
            model and is fine-tuned on AP Physics content.
          </span>
          <br />
          <br />
          <span className="text-black dark:text-white mb-0 font-bold">
            How's this any different from ChatGPT?
          </span>
          <br />
          <span>
            ChatGPT is a general-purpose conversational AI model. This model is
            specifically trained on AP Physics content and is more likely to
            provide accurate and relevant responses to your questions. It's also
            trained using the Official CollegeBoard AP Physics Course and Exam
            Descriptions, Lab Manuals, and other resources.
          </span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

