
import { Button } from "@/components/ui/button";
import React from "react";

interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GenerateButton = ({
  isGenerating,
  isDisabled,
  onClick,
}: GenerateButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isGenerating || isDisabled}
      className={`w-full transition-all flex items-center justify-center rounded-full ${
        isGenerating ? "cursor-not-allowed" : ""
      }`}
      style={{
        height: isGenerating ? 48 : undefined,
        borderRadius: "9999px",
        minHeight: 48,
      }}
    >
      {isGenerating ? (
        <span className="flex items-center justify-center gap-2 animate-fade-in">
          <span className="h-5 w-5 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2" />
          Generating...
        </span>
      ) : (
        "Generate Image"
      )}
    </Button>
  );
};
