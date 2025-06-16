import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipWrapper({
  children,
  content,
  direction = "bottom",
  disabled = false,
}: {
  children: React.ReactNode;
  content: string;
  direction?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
}) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent align="center" side={direction}>
          <p className="font-normal">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
