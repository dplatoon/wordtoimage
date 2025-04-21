
import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";
import { CharacterCounter } from "../atoms/CharacterCounter";

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  placeholder?: string;
}

export const PromptInput = forwardRef<HTMLInputElement, PromptInputProps>(
  ({ value, onChange, maxLength, placeholder }, ref) => {
    return (
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder={placeholder || "A serene mountain lake at sunrise, ultra‑detailed HDR style"}
          value={value}
          onChange={onChange}
          className="w-full pr-16"
          maxLength={maxLength}
          aria-label="Image prompt"
          autoFocus
          ref={ref}
        />
        <CharacterCounter current={value.length} max={maxLength} />
      </div>
    );
  }
);

PromptInput.displayName = "PromptInput";
