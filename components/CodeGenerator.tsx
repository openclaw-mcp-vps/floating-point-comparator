"use client";

import { useMemo, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type LanguageId } from "@/lib/code-templates";

interface GenerateResponse {
  language: LanguageId;
  code: string;
}

function languageToPrism(language: LanguageId):
  | "tsx"
  | "javascript"
  | "python"
  | "go"
  | "java"
  | "csharp"
  | "rust"
  | "cpp" {
  switch (language) {
    case "typescript":
      return "tsx";
    case "javascript":
      return "javascript";
    case "python":
      return "python";
    case "go":
      return "go";
    case "java":
      return "java";
    case "csharp":
      return "csharp";
    case "rust":
      return "rust";
    case "cpp":
      return "cpp";
    default:
      return "tsx";
  }
}

export function CodeGenerator() {
  const [language, setLanguage] = useState<LanguageId>("typescript");
  const [functionName, setFunctionName] = useState("almostEqual");
  const [absoluteTolerance, setAbsoluteTolerance] = useState("1e-12");
  const [relativeTolerance, setRelativeTolerance] = useState("1e-9");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");

  const prismLanguage = useMemo(() => languageToPrism(language), [language]);

  async function onGenerate() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          language,
          functionName,
          absoluteTolerance: Number(absoluteTolerance),
          relativeTolerance: Number(relativeTolerance)
        })
      });

      if (!response.ok) {
        const failed = (await response.json()) as { error?: string };
        throw new Error(failed.error || "Failed to generate code");
      }

      const payload = (await response.json()) as GenerateResponse;
      setCode(payload.code);
    } catch (unknownError) {
      if (unknownError instanceof Error) {
        setError(unknownError.message);
      } else {
        setError("Could not generate code.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Safe Comparison Helpers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LanguageSelector value={language} onChange={setLanguage} />

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Function name
            </label>
            <Input value={functionName} onChange={(event) => setFunctionName(event.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Absolute tolerance
            </label>
            <Input
              value={absoluteTolerance}
              onChange={(event) => setAbsoluteTolerance(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Relative tolerance
            </label>
            <Input
              value={relativeTolerance}
              onChange={(event) => setRelativeTolerance(event.target.value)}
            />
          </div>
        </div>

        <Button onClick={onGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate code"}
        </Button>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        {code ? (
          <div className="overflow-hidden rounded-xl border border-[#2f3d59] bg-[#0b1220]">
            <Highlight theme={themes.vsDark} code={code} language={prismLanguage}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} overflow-x-auto p-4 text-sm`} style={style}>
                  {tokens.map((line, index) => (
                    <div key={index} {...getLineProps({ line })}>
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        ) : (
          <p className="text-sm text-zinc-400">
            Choose your language and tolerances, then generate production-ready helper code.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
