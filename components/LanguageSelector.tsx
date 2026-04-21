"use client";

import { SUPPORTED_LANGUAGES, type LanguageId } from "@/lib/code-templates";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  value: LanguageId;
  onChange: (language: LanguageId) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {SUPPORTED_LANGUAGES.map((language) => {
        const active = language.id === value;

        return (
          <button
            key={language.id}
            type="button"
            className={cn(
              "rounded-xl border px-3 py-2 text-sm font-medium transition",
              active
                ? "border-[#4f9cf9]/60 bg-[#2f7ae0]/20 text-[#9ac8ff]"
                : "border-[#31405f] bg-[#111827] text-zinc-300 hover:border-[#435a84] hover:text-white"
            )}
            onClick={() => onChange(language.id)}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
