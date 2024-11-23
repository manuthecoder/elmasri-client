import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";

export function SymbolPicker({ editor }: { editor: any }) {
  const [currentlySelected, setCurrentlySelected] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const symbols = [
    { symbol: "/", name: "Slash" },
    { symbol: "𝐹", name: "Force" },
    { symbol: "𝐸", name: "Electrical field" },
    { symbol: "𝐵", name: "Magnetic field" },
    { symbol: "𝑉", name: "Voltage" },
    { symbol: "𝐼", name: "Current" },
    { symbol: "𝑅", name: "Resistance" },
    { symbol: "𝑔", name: "Gravity" },
    { symbol: "𝑘", name: "Boltzmann constant" },
    { symbol: "𝑒", name: "Euler's number" },
    { symbol: "𝜀", name: "Emf/Permittivity" },
    { symbol: "∆", name: "Delta" },
    { symbol: "θ", name: "Theta" },
    { symbol: "π", name: "Pi" },
    { symbol: "α", name: "Alpha" },
    { symbol: "β", name: "Beta" },
    { symbol: "γ", name: "Gamma" },
    { symbol: "λ", name: "Lambda" },
    { symbol: "ω", name: "Omega" },
    { symbol: "Ω", name: "Capital omega" },
    { symbol: "∑", name: "Summation" },
    { symbol: "∫", name: "Integral" },
    { symbol: "∂", name: "Partial derivative" },
    { symbol: "√", name: "Square root" },
    { symbol: "∞", name: "Infinity" },
    { symbol: "≈", name: "Approximately" },
    { symbol: "≠", name: "Not equal" },
    { symbol: "≤", name: "Less than or equal to" },
    { symbol: "≥", name: "Greater than or equal to" },
    { symbol: "→", name: "Right arrow" },
    { symbol: "←", name: "Left arrow" },
    { symbol: "∴", name: "Therefore" },
    { symbol: "∵", name: "Because" },
    { symbol: "⊥", name: "Perpendicular" },
    { symbol: "‖", name: "Parallel" },
    { symbol: "⃗", name: "Vector notation" },
    { symbol: "∝", name: "Proportional to" },
    { symbol: "⋅", name: "Dot product" },
    { symbol: "×", name: "Cross product" },
    { symbol: "∠", name: "Angle" },
    { symbol: "±", name: "Plus-minus" },
    { symbol: "′", name: "Prime" },
    { symbol: "″", name: "Double prime" },
    { symbol: "ℏ", name: "Reduced Planck constant" },
    { symbol: "𝜑", name: "Magnetic flux" },
    { symbol: "@", name: "At symbol" },
  ].filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  const handlePress = (symbol: string) => {
    editor.commands.insertContent(symbol);
    setOpen(false);
    setTimeout(() => {
      editor.view.dom.focus();
    }, 10);
  };

  useEffect(() => {
    document
      .querySelector(`[data-index="${currentlySelected}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [currentlySelected]);

  return (
    <Popover
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          setQuery("");
        } else editor.view.dom.focus();
      }}
      open={open}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              className="bg-gray-100 px-1 sm:px-2 text-black dark:text-white dark:bg-neutral-800"
              variant="ghost"
              id="symbolsTrigger"
              onClick={() => {
                if (!localStorage.getItem("charactersHint")) {
                  toast({
                    title: "Pro tip",
                    description: "Hit / to add Greek letters & more",
                  });
                  localStorage.setItem("charactersHint", "true");
                }
              }}
            >
              <Icon style={{ fontVariationSettings: "'wght' 100" }}>
                special_character
              </Icon>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Insert special character</TooltipContent>
      </Tooltip>
      <PopoverContent align="start" className="w-50 p-0 select-none">
        <div className="px-4 pt-4">
          <Input
            placeholder="Search..."
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentlySelected(symbols.length === 0 ? -1 : 0);
            }}
            style={{ marginBottom: 1 }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setCurrentlySelected((t) => Math.max(0, t - 1));
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setCurrentlySelected((t) =>
                  Math.min(symbols.length - 1, t + 1)
                );
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setCurrentlySelected((t) =>
                  Math.min(symbols.length - 1, t + 3)
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCurrentlySelected((t) => Math.max(0, t - 3));
              } else if (e.key === "Enter") {
                e.preventDefault();
                handlePress(symbols[currentlySelected].symbol);
              }
            }}
          />
        </div>
        <div
          className="max-h-72 w-50 overflow-y-scroll grid grid-cols-3 cursor-pointer p-4 pt-2"
          style={{ width: 400, maxWidth: "calc(100vw - 50px)" }}
        >
          {symbols.length === 0 && (
            <div className="col-span-3">
              <p>No results found</p>
            </div>
          )}
          {symbols.map((symbol, index) => (
            <div
              key={symbol.name}
              data-index={index}
              onClick={() => handlePress(symbol.symbol)}
              className={`justify-start hover:bg-neutral-100 active:bg-neutral-200 border border-transparent dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:active:bg-neutral-800 p-2 rounded-xl ${
                currentlySelected === index
                  ? "bg-neutral-100 border-neutral-400 dark:bg-neutral-900 dark:border-neutral-400"
                  : ""
              }`}
            >
              <span className="katex" style={{ fontSize: 30 }}>
                {symbol.symbol}
              </span>
              <p className="text-xs opacity-50">{symbol.name}</p>
            </div>
          ))}
        </div>
        <p className="text-xs prose p-4 dark:prose-invert">
          <kbd>Arrow keys</kbd> to move, <kbd>enter</kbd> to select
        </p>
      </PopoverContent>
    </Popover>
  );
}

