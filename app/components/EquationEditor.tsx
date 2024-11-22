import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { Icon } from "../Icon";

export function EquationEditor({ editor }: any) {
  return (
    <Button
      className="bg-gray-100 dark:bg-neutral-800 px-2 text-black dark:text-white"
      variant="ghost"
      id="functionsTrigger"
      onClick={() => {
        if (!localStorage.getItem("functionsHint")) {
          toast({
            title: "Pro tip",
            description: "Hit @ to quickly add formulas & more",
          });
          localStorage.setItem("functionsHint", "true");
        }
        editor?.chain().focus().addInlineMath().run();
      }}
    >
      <Icon>function</Icon>
    </Button>
  );
}
